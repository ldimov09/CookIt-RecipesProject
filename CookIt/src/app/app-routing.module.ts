import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginFormComponent,
  //canActivate:[NotloggedGuard] ToDo: not logged guard

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
