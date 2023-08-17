import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared-module.module';
import { NotFoundComponent } from './not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AUTHSERVICE } from './core/tokens';
import { environment } from 'src/environments/environment';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://billing_demo_api.com/api'],
        sendAccessToken: true
      }
    }),
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: AUTHSERVICE, useClass: environment.authProvider
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
