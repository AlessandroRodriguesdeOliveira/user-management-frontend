import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { KeycloakAuthService } from '../keycloak/keycloak.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  key = inject(KeycloakAuthService);

  isAdmin(): boolean {
    return this.key.hasResourceRole('ADMIN', 'users-api');
  }

}
