import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const service = inject(AuthService)
  const router = inject(Router)

  const token = service.getFromCookie('ng_accessToken');

  if (token) {
    return true;
  }
  localStorage.setItem('returnUrl', state.url);
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
