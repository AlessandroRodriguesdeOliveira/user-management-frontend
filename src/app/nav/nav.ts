import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeycloakAuthService } from '../keycloak/keycloak.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  key = inject(KeycloakAuthService);

  logout(){
    this.key.logout();
  }

}
