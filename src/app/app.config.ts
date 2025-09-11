import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // blame PrimeNG
    providePrimeNG({
      theme: {
        preset: Aura,
      }
    }),
    provideRouter(routes)
  ]
};
