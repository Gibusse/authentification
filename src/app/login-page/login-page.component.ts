import { Component, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private router = Inject(Router);
  public submitFormValue(form: UntypedFormGroup) {
    console.log('submit form value :', form.value);

  // TODO # implement authentification

    this.redirectToDashboard();
  }

  private redirectToDashboard () {
    void this.router.navigate(['/dashboard']);
  }
}
