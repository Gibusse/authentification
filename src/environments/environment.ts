import { AuthConfig } from 'angular-oauth2-oidc';
import { LocalAuthService } from "src/app/shared/services/local-auth.service";

const baseUrl = 'localhost:4200';

export const environment = {
  name: 'local',
  authProvider: LocalAuthService,
  baseUrl: 'localhost:4200',
  supabaseUrl: 'https://bmjoqhcrhtfhidcoulta.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtam9xaGNyaHRmaGlkY291bHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyMTIyOTksImV4cCI6MjAwNzc4ODI5OX0.97ku-gvKbzfGfadj84MzNo3yHDAM8dve9X7U8Ais3z4',
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
