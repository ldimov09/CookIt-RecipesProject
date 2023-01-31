import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  recipes!: IRecipe[];
  arr: any = [];
  service!: AuthService;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    service: AuthService
  ) {
    this.service = service;
  }
  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe({
      next: (value: any) => {
        this.recipes = value.result;
        this.recipes.map((r) => {
          r.cooktime = Number(r.cooktime);
          r.servings = Number(r.servings);
        });
      },
    });
  }

  react(reaction: string, recipe: IRecipe) {
    this.recipeService.reactToRecipe(recipe, reaction).subscribe({
      next: (response) => {
        if (response.success) {
          const index = this.recipes.indexOf(recipe);

          response.result.cooktime = Number(response.result.cooktime);
          response.result.servings = Number(response.result.servings);
          this.recipes.splice(index, 1, response.result);
        }
      },
    });
  }
  handleDetails(recipe: IRecipe) {
    this.router.navigate([`/details/${recipe.id}`]);
  }
}
