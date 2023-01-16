import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/logged.guard';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { NotloggedGuard } from './auth/not-logged.guard';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { TagCreateFormComponent } from './recipes/tag-create-form/tag-create-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [NotloggedGuard]
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [NotloggedGuard]
  },

  {
    path: 'create',
    component: CreateRecipeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: TagCreateFormComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
