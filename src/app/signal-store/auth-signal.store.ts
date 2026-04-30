import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
}

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, router = inject(Router)) => ({
    // Login
    login(user: User, token: string): void {
      patchState(store, {
        isAuthenticated: true,
        user: user,
        token: token
      });
      
      // Save to localStorage
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    },
    
    // Logout
    logout(): void {
      patchState(store, {
        isAuthenticated: false,
        user: null,
        token: null
      });
      
      // Clear localStorage
      localStorage.removeItem('auth');
      
      // Redirect to home
      router.navigate(['/']);
    },
    
    // Load auth state from localStorage
    loadAuthState(): void {
      const savedAuth = localStorage.getItem('auth');
      if (savedAuth) {
        const { user, token } = JSON.parse(savedAuth);
        patchState(store, {
          isAuthenticated: true,
          user: user,
          token: token
        });
      }
    },
    
    // Update user profile
    updateUser(user: Partial<User>): void {
      if (store.user()) {
        patchState(store, {
          user: { ...store.user()!, ...user }
        });
        
        // Update localStorage
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
          const auth = JSON.parse(savedAuth);
          auth.user = { ...auth.user, ...user };
          localStorage.setItem('auth', JSON.stringify(auth));
        }
      }
    }
  }))
);