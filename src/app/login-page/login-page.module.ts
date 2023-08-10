import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { SharedModule } from '../shared/shared-module.module';
import { LoginPageRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginPageRoutingModule
  ],
  exports: []
})
export class LoginPageModule { }
