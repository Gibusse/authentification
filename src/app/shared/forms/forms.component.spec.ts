import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsComponent } from './forms.component';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaoModule } from '@villedemontreal/angular-ui';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let form: any;
  let formBuilder: UntypedFormBuilder;

  beforeEach(async() => {
    TestBed.configureTestingModule({
     // declarations: [FormsComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BaoModule
      ]
    });
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    form = {
      email: '',
      password:'',
      valid: false
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should output falsy result to the parent when submit empty data or with errors', async() => {
    expect(component.onSubmit(form)).toBeFalsy();
  });

  it('Shoult output thruty result to the parent when submit form with data', async() => {
    form = {
      email:'test@test',
      password: '124dadf22558',
      valid: true
    };
    const result = component.onSubmit(form);
    expect(result).toBeTruthy()
  });
});
