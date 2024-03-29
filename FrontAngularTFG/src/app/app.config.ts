import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {authInterceptorProviders} from "./services/auth.interceptor";
import {DatePipe} from "@angular/common";
import {NativeDateAdapter, provideNativeDateAdapter} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch()), provideAnimations(),
    provideToastr(), authInterceptorProviders, DatePipe, provideNativeDateAdapter(),
  ]

};
