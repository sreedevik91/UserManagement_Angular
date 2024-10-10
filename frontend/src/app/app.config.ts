import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from './store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/app.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([tokenInterceptor])),
  provideStore(),
  provideState({ name: 'users', reducer: userReducer }),
  provideEffects(UserEffects),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  provideStore()]
};
