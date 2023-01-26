import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthGuard } from './auth/logged.guard';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { NotloggedGuard } from './auth/not-logged.guard';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { CatalogComponent } from './recipes/catalog/catalog.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
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
    component: AdminComponent,
    canActivate: [AuthGuard,/*TODO: Make an admin profile AdminGuard*/]
  },

  {
    path: 'recipes',
    component: CatalogComponent,
  },
  {
    path: 'edit/:id',
    component: EditRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
