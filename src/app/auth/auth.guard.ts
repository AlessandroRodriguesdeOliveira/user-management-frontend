import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakAuthService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(KeycloakAuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  authService.login();
  return false;
};
