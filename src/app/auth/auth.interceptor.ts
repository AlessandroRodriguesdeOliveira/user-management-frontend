import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakAuthService } from '../keycloak/keycloak.service'; 
import { catchError, from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(KeycloakAuthService);

  if (req.method === 'OPTIONS') {
    return next(req);
  }

  if (req.url.includes('/realms/')) {
    return next(req);
  }

  return from(auth.updateToken(30)).pipe(
    switchMap(() => {
      const token = auth.token;

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next(req);
    }),
    catchError(err => {
      console.error("Error update token: " + err);
      return next(req);
    })
  );
};