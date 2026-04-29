import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';
import { appInitializer } from './shared/app-initializer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './store/store';
import { AuthEffects } from './store/auth.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding())/*provideClientHydration(withEventReplay()),*/,
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    //provideAppInitializer(() => import('./shared/app-initializer').then(m => m.appInitializer)),
    provideAppInitializer(() => {
      console.log('provideAppInitializer');
    }),
    provideAppInitializer(appInitializer()),
    provideStore(reducers),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), autoPause: true }),
  ],
};
