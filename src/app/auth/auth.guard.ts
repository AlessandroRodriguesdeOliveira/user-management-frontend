import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakAuthService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(KeycloakAuthService);
  return auth.isLoggedIn();
};
