import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideHttpClient} from "@angular/common/http";
import {provideEffects} from '@ngrx/effects';

import {authFeatureKey, authReducer} from "../auth/store/reducers";
import {appFeatureKey, appReducer} from "./store/reducers";

import * as authEffects from '../auth/store/effects'
import * as appEffects from '../app/store/effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(),
    provideEffects(authEffects),
    provideState(authFeatureKey, authReducer),
    provideEffects(appEffects),
    provideState(appFeatureKey, appReducer),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideEffects()
  ]
};
