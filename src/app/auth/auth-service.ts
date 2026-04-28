import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AUTH_LOGIN_RESPONSE_TYPE, RESPONSE_TYPE } from '../shared/types';
import { Role } from '../shared/enums';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)
  private url = environment.apiUrl
  private router = inject(Router)
  private cookie = inject(CookieService)

  //isAuth = computed(() => this.getFromCookie('ng_accessToken') ? true : false)
  //isAuth = signal<boolean>(this.isLoggedIn())

  private refreshInterval: any;
  isAuth = signal(false);
  private userRole = signal<'user' | 'admin' | null>(null);
  //role = signal<string | null>(null)
  role = this.userRole.asReadonly();
  private accessToken = signal<string | null>(null);
  private refreshToken = signal<string | null>(null);


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
    return await this.http.post<RESPONSE_TYPE<any>>(`${this.url}/auth/register`, { role, email, password })
  }

  async login(email: string, password: string) {
    return await this.http.post<RESPONSE_TYPE<AUTH_LOGIN_RESPONSE_TYPE>>(`${this.url}/auth/login`, { email, password })
  }

  private initCookieMonitoring() {
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
    const token = this.getFromCookie('ng_accessToken');
    this.isAuth.set(token !== null);
  }

  private syncFromCookies() {
    const access_token = this.getFromCookie('ng_accessToken');
    const refresh_token = this.getFromCookie('ng_refreshToken');
    const role = this.getFromCookie('ng_userRole') as 'user' | 'admin' | null;

    if (this.accessToken() !== access_token) {
      this.accessToken.set(access_token);
      this.isAuth.set(Boolean(access_token));
    }

    if (this.refreshToken() !== refresh_token) {
      this.refreshToken.set(refresh_token);
    }

    if (this.userRole() !== role) {
      this.userRole.set(role);
    }
  }



  logout() {
    //this.userRole.set(null)
    //localStorage.removeItem('userRole')
    this.clearAll()
    console.log("logout:", this.isAuth())
    //this.router.navigate(['/login'])
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
    return this.getFromCookie('ng_accessToken') !== null
  }

  clearAll() {
    this.removeFromCookie('ng_accessToken')
    this.removeFromCookie('ng_refreshToken')
    this.removeFromCookie('ng_userId')
    this.removeFromCookie('ng_userRole')
    this.isAuth.set(false)
  }


}
