import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RecipeService } from './recipes/recipe.service';
import { RecipesModule } from './recipes/recipes.module';
import { TagCreateFormComponent } from './recipes/tag-create-form/tag-create-form.component';
import { AdminComponent } from './admin/admin.component';
import { TagEditFormComponent } from './recipes/tag-edit-form/tag-edit-form.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StringResourcesService } from './string-resources.service';
import { FavoritesCatalogComponent } from './recipes/favorites-catalog/favorites-catalog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TagCreateFormComponent,
    TagEditFormComponent,
    AdminComponent,
    HomeComponent,
    AboutComponent,
    FavoritesCatalogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecipesModule,
    ReactiveFormsModule,
    AuthModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,

  ],
  providers: [StringResourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
