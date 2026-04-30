import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  InjectionToken,
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

import { provideNgxSignalToast } from 'ngx-signal-toast';
import { provideToastr } from 'ngx-toastr';







export const appConfig: ApplicationConfig = {
  providers: [


    provideToastr(), 

    provideNgxSignalToast({
      position: 'top-left',      // where toasts appear
      duration: 4000,             // auto-dismiss in ms (0 = never)
      theme: 'material',  
            
      layout: 'card',        // layout style
      animation: 'slide',          // enter/leave animation
      maxToasts: 5,                // max visible at once
      showProgress: true,             // show countdown bar
      pauseOnHover: true,             // pause timer on hover
      closeOnClick: false,            // dismiss on toast click
      closable: true,             // show close button
      dedupe: false,            // prevent duplicate messages
      rtl: false,            // right-to-left mode
      zIndex: 9999,             // CSS z-index of container
    }),


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
