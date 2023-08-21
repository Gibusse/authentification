import { Component, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../core/account.service';
import { AuthResponse } from '@supabase/supabase-js';
import { LoginResponse } from '../shared/model/loginResponse';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public isSignIn = true;
  public isSignUp = true;
  public isLogin = false;

  private router = inject(Router);
  private readonly accountServie = inject(AccountService);

  public async submitFormValue(form: UntypedFormGroup) {
    const { email, password } = form.value;

    // TODO # implement authentification
    if (this.isLogin) {
      const { data: userData } = await this.accountServie.signInWithSelect({ email, password});
      if (userData.user && userData.session) {
        this.redirectToDashboard();
      }
    }

    if (!this.isLogin) {
      const loginResponse: LoginResponse  = await this.accountServie.signUp({ email, password});

      if (loginResponse.insertWithAuth.status === 201 && loginResponse.signUpWithAuth.data) {
        this.redirectToDashboard();
      }
    }

  }

  public isSignInOrSignUp(login: any) {
    const signIn = login.target.value;
    return this.isLogin = signIn === 'signIn' ? true : false;
  }

  private redirectToDashboard () {
    this.router.navigate(['/dashboard']);
  }
}
