import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authResolver: ResolveFn<boolean> = (route, state) => {

  const service = inject(AuthService)
  const router = inject(Router)

  const token = service.getAccessTokenFromCookie()

  if(token){
    //const role = service.getUserRoleFromCookie()
    router.navigate(['/'])
    return false 
  }



  return true;
};
