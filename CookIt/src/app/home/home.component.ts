import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../interfaces/recipe';
import { RecipeService } from '../recipes/recipe.service';
import { StringResourcesService } from '../string-resources.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  service!: AuthService;
  strService! : StringResourcesService;
  recipes!: IRecipe[];
  constructor(service: AuthService, private recipeService: RecipeService, private router: Router, strService: StringResourcesService) {
    this.service = service;
    this.strService = strService;
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

  searchAndRedirect(tag: string){
		this.router.navigate(['/recipes'], { queryParams: { search: tag }} )
	}

}
