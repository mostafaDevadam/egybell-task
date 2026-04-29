import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const service = inject(AuthService)
  const router = inject(Router)

  //const token = service.getFromCookie('ng_accessToken');
  const token = service.getAccessTokenFromCookie();


  console.log("authGuard:", state)

  // if token and url is not login, return true
  // if not token and not login url, redirect to login
  // if not token , redirect to login


  const isLoginPage = state.url.includes("login");

  console.log("authGuard:", state.url, "Has token:", !!token);

  // If user has token and tries to access login page → redirect to dashboard
  if (token && isLoginPage) {
    router.navigate(['/dashboard']);
    return false;
  }

  // If user has no token and tries to access protected page → redirect to login
  if (!token && !isLoginPage) {
    localStorage.setItem('returnUrl', state.url);
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Allow access in all other cases (has token + protected page, or no token + login page)
  return true;

};
