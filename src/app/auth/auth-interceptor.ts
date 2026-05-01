// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth-service';
import { SocketSignalStore } from '../signal-store/socket-signal.store';
/*
export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAccessTokenFromCookie();

  console.log("headers1#",req?.headers.get('Authorization'))

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
      console.log("headers2#",req?.headers.get('Authorization'))

  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
      if (error.status === 401 && !req.url.includes('/refresh')) {
        // Return the refresh token observable
        return authService.refreshTokenAPI().pipe(
          switchMap((response) => {
            console.log("response:", response)
            if (response?.access_token) {
              // Create new request with fresh token
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access_token}`,
                  'Content-Type': 'application/json',
                }
              });
              // Return the retry of the request
                console.log("headers3#",req?.headers.get('Authorization'), newRequest)

              return next(newRequest);
            }
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
*/


// Global-ish state for the interceptor (lives for the app session)
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const socketSignalStore = inject(SocketSignalStore);
  const router = inject(Router);

  const accessToken = authService.getAccessTokenFromCookie();

  // 1. Attach token to initial request
  let authReq = req;
  if (accessToken) {
    authReq = addTokenHeader(req, accessToken);
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401 ) {
        return handle401Error(authReq, next, authService, socketSignalStore, router);
      }
      return throwError(() => error);
    })
  );
};

// Helper to add headers
function addTokenHeader(request: HttpRequest<any>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
}
type SocketStoreInstance = InstanceType<typeof SocketSignalStore>;

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, socketSignalStore: SocketStoreInstance, router: Router) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null); // Reset the subject

    return authService.refreshTokenAPI().pipe(
      switchMap((response) => {
        // 1. Check if token exists
        if (response?.access_token) {
          socketSignalStore.updateToken(response.access_token);

          const newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.access_token}`,
              'Content-Type': 'application/json',
            }
          });

          return next(newRequest); // Returns Observable<HttpEvent<any>>
        }

        // 2. Handle the "No Token" case (The fix for your error)
        authService.logout();
        router.navigate(['/login']);

        // You MUST return an observable here to satisfy TypeScript
        return throwError(() => new Error('Refresh token failed: No access token in response'));

      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    // If refreshing is in progress, wait for the new token
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(req, token!)))
    );
  }
}