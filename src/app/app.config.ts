import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';
import { HumandroidTheme } from './themes/humandroid';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // blame PrimeNG
    providePrimeNG({
      theme: {
        preset: HumandroidTheme
      }
    }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
