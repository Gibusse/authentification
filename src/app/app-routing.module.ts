import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
// import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'**',
    pathMatch: 'full',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
