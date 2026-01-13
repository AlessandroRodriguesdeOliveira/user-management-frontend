import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakAuthService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const keyService = inject(KeycloakAuthService);
  const router = inject(Router);

  
  if (!keyService.isLoggedIn()) {
    return router.createUrlTree(['/user']);
  }

  
  if (!keyService.hasResourceRole('ADMIN', 'users-api')) {
    return router.createUrlTree(['/user']);
  }

  return true;
};
