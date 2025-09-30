import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('blog-admin-token');

  if (token) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
