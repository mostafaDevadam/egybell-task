// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth-service';

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