import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DetailsRecipeComponent } from './details-recipe/details-recipe.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    CatalogComponent,
    EditRecipeComponent,
    DetailsRecipeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class RecipesModule { }
