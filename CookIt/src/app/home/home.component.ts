import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../interfaces/recipe';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  service!: AuthService;
  recipes!: IRecipe[];
  constructor(service: AuthService, private recipeService: RecipeService, private router: Router) {
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

        this.recipes.reverse();

        this.recipes = this.recipes.slice(0, 4);
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
