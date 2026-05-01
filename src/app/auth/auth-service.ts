import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { AUTH_LOGIN_RESPONSE_TYPE, RESPONSE_TYPE, USER_TYPE } from '../shared/types';
import { Role } from '../shared/enums';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl
  private router = inject(Router)
  private cookie = inject(CookieService)
  private keys = environment.keys

  //isAuth = computed(() => this.getFromCookie('ng_accessToken') ? true : false)
  //isAuth = signal<boolean>(this.isLoggedIn())

  private refreshInterval: any;
  isAuth = signal(false);
  private userRole = signal<'user' | 'admin' | null>(null);
  //role = signal<string | null>(null)
  role = this.userRole.asReadonly();
  private accessToken = signal<string | null>(null);
  accessToken$ = this.accessToken.asReadonly();
  private refreshToken = signal<string | null>(null);
  refreshToken$ = this.refreshToken.asReadonly();
  private userID = signal<string | null>(null);
  userID$ = this.userID.asReadonly();


  // Role check helpers
  isAdmin = computed(() => this.userRole() === 'admin');
  isUser = computed(() => this.userRole() === 'user');

  authState = computed(() => {
    return this.getFromCookie('ng_accessToken')
  })

  constructor() {
    this.initCookieMonitoring()
    // Create effect with automatic cleanup
    const authEffect = effect(() => {
      const authenticated = this.isAuth();

      if (authenticated) {
        console.log('User authenticated - starting token refresh');
        this.startTokenRefresh();
      } else {
        console.log('User not authenticated - stopping token refresh');
        this.stopTokenRefresh();
      }

      // Return cleanup function (runs when effect re-runs or service destroys)
      return () => {
        console.log('Cleaning up auth effect');
        this.stopTokenRefresh();
      };
    });
  }

  async register(email: string, password: string, role: Role) {
    return await this.http.post<RESPONSE_TYPE<any>>(`${this.apiUrl}/auth/register`, { role, email, password })
  }

  async login(email: string, password: string) {
    return await this.http.post<RESPONSE_TYPE<AUTH_LOGIN_RESPONSE_TYPE>>(`${this.apiUrl}/auth/login`, { email, password })
  }

    login$(email: string, password: string) {
    return this.http.post<RESPONSE_TYPE<AUTH_LOGIN_RESPONSE_TYPE>>(`${this.apiUrl}/auth/login`, { email, password })
  }

   refreshTokenAPI(): Observable<IRefreshTokenResponse | null> {
    const refreshToken = this.getRefreshTokenFromCookie();
    
    if (!refreshToken) {
      console.log('No refresh token available');
      return of(null);
    }
    
    console.log('Refreshing tokens...');
    return this.http.post<RESPONSE_TYPE<IRefreshTokenResponse>>(`${this.apiUrl}/auth/refresh`, { refresh_token: refreshToken }).pipe(
      map(response => response.data), // Extract the data from RESPONSE_TYPE
      tap((data) => {
        if (data.access_token && data.refresh_token) {
          // Save both new tokens
          //this.saveTokens(response.access_token, response.refresh_token);
          this.saveAccessTokenInCookie(data.access_token)
          this.saveRefreshTokenInCookie(data.refresh_token)
          console.log('Tokens refreshed successfully:', data);
        }
      }),
      catchError(error => {
        console.error('Refresh token failed:', error);
        this.logout();
        return of(null);
      })
    );
  }

  logoutAPI(id: any): Observable<any> {
    return this.http.post<RESPONSE_TYPE<any>>(`${this.apiUrl}/auth/logout/${id}`, null)
  }


  async fetchAuthUser() {
     return await this.http.get<RESPONSE_TYPE<USER_TYPE>>(`${this.apiUrl}/auth/me`)
  }

  public initCookieMonitoring() {
    // Initial sync
    this.syncFromCookies();

    // Monitor cookie changes
    setInterval(() => {
      this.syncFromCookies();
    }, 500);

    // Check when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.syncFromCookies();
      }
    });
  }


  private startTokenRefresh() {
    this.refreshInterval = setInterval(() => {
      console.log('Refreshing token...');
      this.checkToken();


    }, 300000); // Every 5 minutes
  }

  private stopTokenRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private checkToken() {
    const token = this.getFromCookie(this.keys.NG_ACCESSTOKEN);
    this.isAuth.set(token !== null);
  }

  private syncFromCookies() {
    const access_token = this.getFromCookie(this.keys.NG_ACCESSTOKEN);
    const refresh_token = this.getFromCookie(this.keys.NG_REFRESHTOKEN);
    const role = this.getFromCookie(this.keys.NG_USERROLE) as 'user' | 'admin' | null;
    const user_id = this.getUserIDFromCookie();


    if (this.accessToken() !== access_token) {
      this.accessToken.set(access_token);
      this.isAuth.set(Boolean(access_token));
    }

    if (this.refreshToken() !== refresh_token) {
      this.refreshToken.set(refresh_token);
    }

    if(this.userID() !== user_id){
      this.userID.set(user_id)
    }

    if (this.userRole() !== role) {
      this.userRole.set(role);
    }
  }

  getAccessToken(){
    return this.accessToken()
  }
  getRefreshToken(){
    return this.refreshToken()
  }

  getUserRole(){
    return this.userRole()
  }

  getUserID(){
    return this.userID()
  }

  saveAccessTokenInCookie(value: string){
       this.saveInCookie(this.keys.NG_ACCESSTOKEN, value)
  }

   saveRefreshTokenInCookie(value: string){
       this.saveInCookie(this.keys.NG_REFRESHTOKEN, value)
  }

  getAccessTokenFromCookie(){
    return this.getFromCookie(this.keys.NG_ACCESSTOKEN)
  }

  getRefreshTokenFromCookie(){
    return this.getFromCookie(this.keys.NG_REFRESHTOKEN)
  }

  getUserRoleFromCookie(): 'user' | 'admin' | null {
    return this.getFromCookie(this.keys.NG_USERROLE) as 'user' | 'admin' | null
  }

  getUserIDFromCookie(){
    return this.getFromCookie(this.keys.NG_USERID)
  }



  async logout() {
    //this.userRole.set(null)
    //localStorage.removeItem('userRole')
    await this.logoutAPI(this.getUserIDFromCookie()).subscribe(res => console.log("logout res:", res))
    this.clearAll()
    console.log("logout:", this.isAuth())
    this.router.navigate(['/login'])
  }

  saveInCookie(key: string, value: string, daysExpire: number = 7) {
    this.cookie.set(key, value, daysExpire, '/', undefined, true, /*{expires: 24, secure: true, sameSite: 'Lax', path: '/'}*/)
  }

  getFromCookie(key: string): string | null {
    return this.cookie.get(key)
  }

  removeFromCookie(key: string) {
    this.cookie.delete(key)
  }

  isLoggedIn() {
    return this.getFromCookie(this.keys.NG_ACCESSTOKEN) !== null
  }

  clearAll() {
    this.removeFromCookie(this.keys.NG_ACCESSTOKEN)
    this.removeFromCookie(this.keys.NG_REFRESHTOKEN)
    this.removeFromCookie(this.keys.NG_USERID)
    this.removeFromCookie(this.keys.NG_USERROLE)
    this.isAuth.set(false)
  }


}
