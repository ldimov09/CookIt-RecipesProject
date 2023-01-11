import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    //canActivate: [NotloggedGuard] ToDo: not logged guard
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    //canActivate: [NotloggedGuard] ToDo: not logged guard
  },
  {
    path: 'create',
    component: CreateRecipeComponent,
    //canActivate: [LoggedGurad] ToDo: Logged guard
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
