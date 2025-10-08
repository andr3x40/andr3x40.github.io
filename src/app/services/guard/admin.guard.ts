import { CanActivateFn } from '@angular/router';

import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAdminUser();
};
