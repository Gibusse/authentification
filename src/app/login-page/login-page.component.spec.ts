import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { AccountService } from '../core/account.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsComponent } from '../shared/forms/forms.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [HttpClientModule, FormsComponent],
      providers: [AccountService]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
