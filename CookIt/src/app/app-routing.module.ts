import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthGuard } from './auth/logged.guard';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { NotloggedGuard } from './auth/not-logged.guard';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './recipes/catalog/catalog.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { DetailsRecipeComponent } from './recipes/details-recipe/details-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { TagCreateFormComponent } from './recipes/tag-create-form/tag-create-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [NotloggedGuard],
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [NotloggedGuard],
  },

  {
    path: 'create',
    component: CreateRecipeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'recipes',
    component: CatalogComponent,
  },
  {
    path: 'edit/:id',
    component: EditRecipeComponent,
  },
  {
    path: 'details/:id',
    component: DetailsRecipeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
