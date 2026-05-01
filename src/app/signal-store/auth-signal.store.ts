import { signalStore, withState, withMethods, patchState, withProps, withHooks } from '@ngrx/signals';
import { computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../shared/enums';
import { AuthService } from '../auth/auth-service';
import { MessageService } from '../components/toast-uis/message/message-service';

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
  withProps(() => ({
    _authService: inject(AuthService),
    _router: inject(Router),
    _messageService: inject(MessageService)
  })),
  withMethods((store) => ({
    // Login
    login(data: { access_token: string, refresh_token: string, role: Role, userID: number }): void {
      patchState(store, {
        isAuthenticated: Boolean(data.access_token),
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        role: data.role,
        userID: data.userID,
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
      store._router.navigate(['/login']);
    },

    // Load auth state from localStorage/cache
    loadAuthState(): void {
      /*const access_token = authService.getAccessTokenFromCookie();
      const refresh_token = authService.getRefreshTokenFromCookie();
      const role = authService.getUserRoleFromCookie() as Role;
      const userID = Number(authService.getUserIDFromCookie());*/

      const access_token = store._authService.getAccessTokenFromCookie();
      const refresh_token = store._authService.getRefreshTokenFromCookie();
      const role = store._authService.getUserRoleFromCookie() as Role;
      const userID = Number(store._authService.getUserIDFromCookie())
      const isAuthenticated = Boolean(access_token);


      patchState(store, {
        isAuthenticated,
        //user: user,
        access_token,
        refresh_token,
        role,
        userID,
      });

    },

    // Update user profile
    updateUser(user: Partial<IUser>): void {
      console.log("auth signal store updateUser user:", user, store.user())
      if (store.user()) {
        console.log("auth signal store updateUser store user before:", store.user())
        patchState(store, {
          user: { ...store.user()!, ...user },
          /*access_token: store.access_token(),
          refresh_token: store.refresh_token(),
          role: store.role(),
          userID: store.userID(),*/
        });


        // Update localStorage
        // update cache
        /*const savedAuth = localStorage.getItem('auth');
        // get from cache
        if (savedAuth) {
          const auth = JSON.parse(savedAuth);
          auth.user = { ...auth.user, ...user };
          localStorage.setItem('auth', JSON.stringify(auth));
          // save it in cache
        }*/
      }
      /*const access_token = authService.getAccessTokenFromCookie();
      const refresh_token = authService.getRefreshTokenFromCookie();*/
      const access_token = store._authService.getAccessTokenFromCookie();
      const refresh_token = store._authService.getRefreshTokenFromCookie();
      patchState(store, {
        user: { ...user },
        role: user.role,
        userID: user.id!!,
        access_token,
        refresh_token,
      })
      console.log("auth signal store updateUser store user after:", store.user(), store.access_token(), store.refresh_token(), store.role(), store.userID())
    },
    clearLogs() {
      console.log('Session cleared');
    }
  })),
  withHooks({
    onInit: (store) => {
      store.loadAuthState();
      console.log('AuthStore initialized with state:', store.isAuthenticated());

      effect(() => {
        const stateToSave = {
        access_token: store.access_token(),
        refresh_token: store.refresh_token(),
        user: store.user(),
        role: store.role()
      };
      if(store.access_token() === store._authService.getAccessTokenFromCookie()) {
        console.log("AuthStore effect Access token is the same")
        //store._messageService.showStacked("Access token is the same", 5)
      }else {
        console.log("AuthStore effect Access token is different")
        //store._messageService.showStacked("Access token is different", 5)
        // copy access_token from cookie to state
        patchState(store, {
          access_token: store._authService.getAccessTokenFromCookie(),
          refresh_token: store._authService.getRefreshTokenFromCookie(),
          role: store._authService.getUserRoleFromCookie() as Role,
          userID: Number(store._authService.getUserIDFromCookie())
        });
      }

        console.log('AuthStore effect state changed to:', store.isAuthenticated(), stateToSave);
      })
    },
    onDestroy: (store) => {
      store.clearLogs();
      console.log('AuthStore destoryed with state:', store.isAuthenticated());
    }
  }),
);