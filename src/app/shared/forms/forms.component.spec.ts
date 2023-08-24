import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsComponent } from './forms.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaoModule } from '@villedemontreal/angular-ui';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let emitData: FormGroup;
  const form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    valid: new FormControl(false)
  });

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BaoModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should output falsy result to the parent when submit empty data or with errors', async() => {
    form.setValue({
      email: '',
      password: '',
      valid: false
    });

    const formToSubmit = form.value as UntypedFormGroup;
    const response = component.onSubmit(formToSubmit);

    expect(response).toBeFalsy();
  });

  it('Shoult output thruty result to the parent when submit form with data', async() => {
    form.setValue({
      email: 'test@test',
      password: '124dadf22558',
      valid: true
    });

    const button = fixture.nativeElement.querySelector('button');

    component.emitFormValue.subscribe(data => emitData = data);
    button.click();
    fixture.detectChanges();

    const result = component.onSubmit(form);

    expect(emitData).toEqual(form);
    expect(result).toBeTruthy();
  });
});
