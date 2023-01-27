import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrls: ['./details-recipe.component.scss'],
})
export class DetailsRecipeComponent implements OnInit {
  recipes!: IRecipe[];
  reactionRecipe!:any;
  service!: AuthService;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    service: AuthService
  ) {
    this.service = service;
  }
  id: string = this.activatedRoute.snapshot.params?.['id'];
  recipe!: IRecipe;
  ngOnInit(): void {
    this.recipeService.getOneRecipe(this.id).subscribe({
      next: (response: any) => {
        this.recipe = response.result;
      },
      error: (error: string) => {
        console.log(error);
      },
    });
   
  }
  react(reaction: string, recipe:any) {
    this.recipeService.reactToRecipe(recipe, reaction).subscribe({
      next: (response) => {
        
         this.reactionRecipe= response.result
        
        }
      },)
    
    }
}
