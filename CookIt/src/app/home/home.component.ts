import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../interfaces/recipe';
import { RecipeService } from '../recipes/recipe.service';
import { StringResourcesService } from '../string-resources.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  service!: AuthService;
  strService! : StringResourcesService;
  recipes!: IRecipe[];
  videoUrls: any = {
    '56': 'https://google.com',
  };
  url = '';
  constructor(service: AuthService, private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router, strService: StringResourcesService) {
    this.service = service;
    this.strService = strService;
  }
  user: any;
  
  getAllTags() {
    this.recipeService.getAllTags().subscribe({
      next: (allTags) => {
       
        
            if (this.service.isLoggedIn()) {
              this.getUserById(this.service.user.id);
            }
          },
          error: (error) => {},
        });
      }
      
      getUserById(id: string) {
        this.service.getUserById(id).subscribe({
          next: (response: any) => {
            this.user = response.result;
          },
          error: () => {},
        });
      }
      ngOnInit() {
        if (this.service.isLoggedIn()) {
          this.getUserById(this.service.user.id);
        }
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
  video(recipe: IRecipe) {
    if (recipe.id) {
      this.url = this.videoUrls[recipe.id];
    }
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
  changeFavoriteStatus(recipeId: string, newStatus: number) {
    console.log(this.user);
    
    this.recipeService
      .changeFavoriteStatus(recipeId, this.user.id, newStatus)
      .subscribe({
        next: (response: any) => {
          this.user = response.result;
        },
        error: () => {},
      });
  }
}


