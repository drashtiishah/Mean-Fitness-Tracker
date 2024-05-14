import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { Provider } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptor/auth.interceptor';

/** Provider for the Noop Interceptor. */
export const authInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    authInterceptorProvider]
};
