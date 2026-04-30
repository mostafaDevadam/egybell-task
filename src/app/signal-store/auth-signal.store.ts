import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../shared/enums';
import { AuthService } from '../auth/auth-service';

export interface IUser {
  id?: number;
  email?: string;
  role?: Role;
}

type AuthState = {
  isAuthenticated: boolean;
  user: IUser | null;
  access_token: string | null;
  refresh_token: string | null;
  role: Role | null
  userID: number | null
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  access_token: null,
  refresh_token: null,
  role: null,
  userID: null
};

export const AuthSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, router = inject(Router), authService = inject(AuthService)) => ({
    // Login
    login(user: IUser, access_token: string, refresh_token: string, role: Role): void {
      patchState(store, {
        isAuthenticated: Boolean(access_token),
        user,
        access_token,
        refresh_token,
        role,
      });
      
      // Save to localStorage/cache: access_token, refresh_token, role, userID
      //localStorage.setItem('auth', JSON.stringify({ user, token }));
    },
    
    // Logout
    logout(): void {
      patchState(store, {
        isAuthenticated: false,
        user: null,
        access_token: null,
        refresh_token: null,
        role: null,
      });
      
      // Clear localStorage/cache by key
      localStorage.removeItem('auth');
      
      // Redirect to home
      router.navigate(['/']);
    },
    
    // Load auth state from localStorage/cache
    loadAuthState(): void {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const { user, token, role, userID } = JSON.parse(savedAuth);
        patchState(store, {
          isAuthenticated: true,
          user: user,
          access_token: token,
          refresh_token: token,
          role: role,
          userID: userID
        });
      }
    },
    
    // Update user profile
    updateUser(user: Partial<IUser>): void {
      if (store.user()) {
        patchState(store, {
          user: { ...store.user()!, ...user },
          access_token: store.access_token(),
          refresh_token: store.refresh_token(),
          role: store.role(),
          userID: store.userID(),
        });
        
        // Update localStorage
        // update cache
        const savedAuth = localStorage.getItem('auth');
        // get from cache
        if (savedAuth) {
          const auth = JSON.parse(savedAuth);
          auth.user = { ...auth.user, ...user };
          localStorage.setItem('auth', JSON.stringify(auth));
          // save it in cache
        }
      }
    }
  }))
);