import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaoModule } from '@villedemontreal/angular-ui';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BaoModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
