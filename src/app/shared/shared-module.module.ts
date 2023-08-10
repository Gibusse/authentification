import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './forms/forms.component';
import { BaoModule } from '@villedemontreal/angular-ui';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BaoModule,
    FormsComponent
  ],
  exports: [
    BaoModule,
    FormsComponent
  ]
})
export class SharedModule { }
