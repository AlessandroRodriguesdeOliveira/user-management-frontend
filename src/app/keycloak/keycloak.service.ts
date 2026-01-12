import Keycloak from 'keycloak-js';

export class KeycloakAuthService {
  private keycloak!: Keycloak;

  async init(): Promise<void> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'user-management',
      clientId: 'users-api'
    });

    await this.keycloak.init({
      onLoad: 'login-required',
      pkceMethod: 'S256',
      checkLoginIframe: false
    });
  }

  get token() {
    return this.keycloak.token;
  }

  async updateToken(minValidity = 30) {
    await this.keycloak.updateToken(minValidity);
  }

  isLoggedIn() {
    return !!this.keycloak.token;
  }

  hasRole(role: string) {
    return this.keycloak.hasRealmRole(role);
  }

  get profile() {
    return this.keycloak.tokenParsed;
  }

  logout() {
    return this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
