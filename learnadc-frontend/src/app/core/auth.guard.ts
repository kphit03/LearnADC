import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.getToken()) { //uses getToken() method to check if user has a token
    return true;
  }

  router.navigate(['/auth/login']); //if no token on a page they need to be authenticated for, redirect to login page
  return false;
};
