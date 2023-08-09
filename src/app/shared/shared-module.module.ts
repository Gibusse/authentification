import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './forms/forms.component';
import { BaoModule } from '@villedemontreal/angular-ui';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaoModule,
    FormsComponent
  ],
  exports: [
    FormsComponent
  ]
})
export class SharedModule { }
