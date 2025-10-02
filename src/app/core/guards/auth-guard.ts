import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
