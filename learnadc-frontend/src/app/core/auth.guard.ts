import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const roles: string[] = decoded?.roles || [];

    const isAdminRoute = state.url.startsWith('/admin');
    const isAdmin = roles.includes('ROLE_ADMIN');

    // If accessing /admin without ROLE_ADMIN, redirect
    if (isAdminRoute && !isAdmin) {
      router.navigate(['/dashboard']);
      return false;
    } 
    return true; // user is allowed
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    router.navigate(['/auth/login']);
    return false;
  }
};
