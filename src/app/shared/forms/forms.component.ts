import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BaoModule } from '@villedemontreal/angular-ui';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BaoModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormsComponent {
  public form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });
  public submitted = false;
  @Input() isLogin = false;

  @Output() emitFormValue = new EventEmitter<UntypedFormGroup>();

  constructor(private formBuilder: UntypedFormBuilder) {}

  public get f() {
    return this.form.controls;
  }

  public onSubmit(form: UntypedFormGroup) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      this.emitFormValue.emit(form);
      this.form.reset();
      return form.valid;
    }
    return this.submitted = false;
  }

  public onClear(value: string) {
    const formControlAttribute = value;
    this.form.patchValue({ [formControlAttribute]: '' });
  }
}
