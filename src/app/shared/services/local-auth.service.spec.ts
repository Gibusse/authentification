import { TestBed } from '@angular/core/testing';

import { LocalAuthService } from './local-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

describe('LocalAuthServiceService', () => {
  let service: LocalAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LocalAuthService, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    });
    service = TestBed.inject(LocalAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
