import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './services/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(Auth);

  if (authService.getToken()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
