import { Injectable } from '@angular/core';
import { JwksValidationHandler, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { IAuthService } from './iauth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LocalAuthService implements IAuthService {

  constructor(private oauthService: OAuthService, private router: Router) { }
  public async init(): Promise<void> {
    this.oauthService.configure({
      ...environment.authConfig
    });
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.events.subscribe(this.onOAuthServiceEvent.bind(this));
  }

  getAccessToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      try {
        const token = this.oauthService.getAccessToken();
        resolve(token);
      } catch {
        reject(null);
      }
    })
  }
  public initLogin(additionalState: string): Promise<boolean> {
    return this.oauthService
      .loadDiscoveryDocumentAndTryLogin({
        onTokenReceived: info => {
          if (info.state) {
            return this.router.navigateByUrl(info.state.toString(), {
              replaceUrl: true // <-- important! otherwise the state is lost when redirecting back to your app after login
            })
          }
          return;
        }
      })
      .then(() => this.valideOrRedirect(additionalState))
  }

  public authCheck(redirectUri: string) {
    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initLoginFlow(redirectUri);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  private onOAuthServiceEvent(e: OAuthEvent) {
    if (e.type === 'silent_refresh_error' || e.type === 'logout') {
      this.onLogOut();
    }
  }

  private valideOrRedirect(additionalState?: string): Promise<boolean> {
    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initCodeFlow(additionalState);
      return Promise.resolve(false);
    }
    if (additionalState === '/autorisation') {
      return this.router.navigateByUrl('/', {
        replaceUrl: true,
      });
    }
    return Promise.resolve(true);
  }

  private onLogOut() {
    return environment.baseUrl;
  }
}
