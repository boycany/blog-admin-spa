import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const loginPageGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthService).isAuthenticated();
  const router = inject(Router);

  if (isAuthenticated) {
    return router.createUrlTree(['/']);
  } else {
    return true;
  }
};
