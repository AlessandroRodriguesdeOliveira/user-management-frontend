import { KeycloakConfig } from "keycloak-js"
export const keycloakConfig: KeycloakConfig = {
    url: "http://localhost:8080",
    realm: "user-management",
    clientId: "users-api"
} 