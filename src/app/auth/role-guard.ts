import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const roleGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)
  const router = inject(Router)

  const token = service.getFromCookie('ng_accessToken');
  const userRole = service.getFromCookie('ng_userRole');
  const requiredRole = route.data['role']; 
  const allowedRoles = route.data['roles'] as string[];
  
  if(!token){
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if(requiredRole && userRole !== requiredRole){
     console.log('Access denied - wrong role');
    router.navigate(['/unauthorized']);
    return false;
  }

  if(allowedRoles && !allowedRoles.includes(userRole || '')){
    console.log('Access denied - role not allowed');
    router.navigate(['/unauthorized']);
    return false;
  }


  console.log('Access granted');
  return true;
};
