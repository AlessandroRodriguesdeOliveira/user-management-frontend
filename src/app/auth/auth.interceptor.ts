import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakAuthService } from '../keycloak/keycloak.service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(KeycloakAuthService);

  if (req.method === 'OPTIONS' || req.url.includes('/realms/')) {
    return next(req);
  }

  return from(auth.updateToken(30)).pipe(
    switchMap(() => {
      const token = auth.token;

      const authReq = token
        ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        : req;

      return next(authReq);
    }),
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        auth.login();
      }

      return throwError(() => err);
    })
  );
};