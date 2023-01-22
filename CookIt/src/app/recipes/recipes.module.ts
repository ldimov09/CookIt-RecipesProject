import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CatalogComponent } from './catalog/catalog.component';
import { TagEditFormComponent } from './tag-edit-form/tag-edit-form.component';
import { TagCreateFormComponent } from './tag-create-form/tag-create-form.component';



@NgModule({
  declarations: [
    CreateRecipeComponent,
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule { }
