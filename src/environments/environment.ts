import { AuthConfig } from 'angular-oauth2-oidc';
import { LocalAuthService } from "src/app/shared/services/local-auth.service";

const baseUrl = 'localhost:4200';

export const environment = {
  name: 'local',
  authProvider: LocalAuthService,
  baseUrl: 'localhost:4200',
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_KEY',
  authConfig: {
    // Url of the Identity Provider
    issuer: 'https://demo.identityserver.com/identity',
    // Login Url of the Identity Provider
    loginurl: 'https://demo.identityserver.com/identity/connect/authorize',
    // Login Url of the Identity Provider
    logouturl: 'https://demo.identityserver.com/identity/connect/endsession',
    // URL of the SPA to redirect the user to after login
    redirectUri: `${baseUrl}/autorisation`,
    // The SPA's id. The SPA is registerd with this id at the auth-server
    clientId: 'billing_demo',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. Also provide user sepecific
    scope: 'openid profile email billing_demo_api',
    silentRefreshRedirectUri: `${baseUrl}/assets/html/silent-refresh.html`,
    sessionChecksEnabled: true
  } as AuthConfig
}
