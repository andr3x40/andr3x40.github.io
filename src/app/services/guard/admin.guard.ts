import { CanActivateChildFn } from '@angular/router';

import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateChildFn = (route, state) => {
  return inject(AuthService).isAdminUser();
};
