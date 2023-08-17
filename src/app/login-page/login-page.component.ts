import { Component, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../core/account.service';
import { AuthResponse } from '@supabase/supabase-js';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private router = inject(Router);
  private readonly accountServie = inject(AccountService);

  public async submitFormValue(form: UntypedFormGroup) {
    console.log('submit form value :', form);
    const { email, password } = form.value;

    // TODO # implement authentification
    const data: AuthResponse | null = await this.accountServie.signUp({ email, password});
    if (data?.data) {
      this.redirectToDashboard();
    }
  }

  private redirectToDashboard () {
    this.router.navigate(['/dashboard']);
  }
}
