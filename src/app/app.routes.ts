import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [

    // normal lazy
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard],
        data: {roles: ['user', 'admin']}
    },
    {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then(m => m.Users),
        canActivate: [authGuard],
        data: {role: 'admin'}
    },
    {
        path: 'logs',
        loadComponent: () => import('./pages/activity-logs/activity-logs').then(m => m.ActivityLogs),
        canActivate: [authGuard],
        data: {role: 'admin'}
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register),
        //canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        //canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard],
         data: {roles: ['user', 'admin']}
    },
    {
        path: 'profile/:id/view',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard],
         data: {role: 'admin'}
    },
    {
        path: 'profile/:id/edit',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [authGuard],
        data: {roles: ['user', 'admin']}
    },
    //{path: '**',   loadComponent: () => import('./pages/error/error').then(m => m.Error)},
    { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
];
