import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

import { graphQLProvider } from 'graphql.provider';
import { imageProvider } from 'image.provider';

import * as FIREBASE_CONFIG from 'firebase.config.json'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    graphQLProvider,
    imageProvider,
  ]
};
