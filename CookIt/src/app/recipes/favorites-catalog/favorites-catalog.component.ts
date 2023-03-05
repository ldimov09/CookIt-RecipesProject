import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { StringResourcesService } from 'src/app/string-resources.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-favorites-catalog',
  templateUrl: './favorites-catalog.component.html',
  styleUrls: ['./favorites-catalog.component.scss']
})
export class FavoritesCatalogComponent {
  
  recipes!: IRecipe[];
  
  strService!: StringResourcesService;
  isLoading: boolean = true;
  service: AuthService;


  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    service: AuthService,
    strService: StringResourcesService
  ) {
    this.service = service;
    this.strService = strService;
  }

  ngOnInit() {
    this.recipeService.getUserFavorites(this.service.user.id).subscribe({
      next: (value: any) => {
        this.recipes = value.result;
        this.recipes.map((r) => {
          r.cooktime = Number(r.cooktime);
          r.servings = Number(r.servings);
        });

        this.isLoading = false;

      },
    });
  }

  handleDetails(recipe: IRecipe) {
    this.router.navigate([`/details/${recipe.id}`]);
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
}
