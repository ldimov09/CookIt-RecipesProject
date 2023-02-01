import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ITag } from 'src/app/interfaces/tag';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  recipes!: IRecipe[];
  recipesShowing!: IRecipe[];
  arr: any = [];
  service!: AuthService;
  allTags!: ITag[];

  
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    service: AuthService
  ) {
    this.service = service;
  }
  
  form = new FormGroup({
		searchTag: new FormControl('', [])
	});

  handleSearch(form: FormGroup) {
    console.log(this.form.value)
    if(this.form.value.searchTag! !== ''){
      this.recipesShowing = this.recipes.filter(r => r.tags.includes(this.form.value.searchTag!));
    }else{
      this.recipesShowing = this.recipes;
    }
  }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe({
      next: (value: any) => {
        this.recipes = value.result;
        this.recipes.map((r) => {
          r.cooktime = Number(r.cooktime);
          r.servings = Number(r.servings);
        });

        this.recipesShowing = this.recipes;

        this.getAllTags();

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

  getAllTags() {
    this.recipeService.getAllTags()
      .subscribe({
        next: (allTags) => {
          this.allTags = allTags.result;
        },
        error: (error) => {
        }
      })
  }
}
