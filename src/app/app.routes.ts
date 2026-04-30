import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { roleGuard } from './auth/role-guard';
import { authResolver } from './auth/auth-resolver';

export const routes: Routes = [

    // normal lazy
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['user', 'admin'] }
    },
    {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then(m => m.Users),
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' }
    },
    {
        path: 'logs',
        loadComponent: () => import('./pages/activity-logs/activity-logs').then(m => m.ActivityLogs),
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' }
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register),
         resolve: {auth: authResolver}
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        resolve: {auth: authResolver}
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['user', 'admin'] }
    },
    {
        path: 'profile/:id/view',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' }
    },
    {
        path: 'profile/:id/edit',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['user', 'admin'] }
    },

    { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
    { path: 'unauthorized', loadComponent: () => import('./pages/unauthorized/unauthorized').then(m => m.Unauthorized) },
    { path: 'error', loadComponent: () => import('./pages/error/error').then(m => m.Error) },
     { path: 'notfound', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
];
