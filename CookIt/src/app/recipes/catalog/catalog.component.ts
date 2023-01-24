import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private recipeSurvice: RecipeService, router: Router) {}
  ngOnInit() {
    this.recipeSurvice.getAllRecipes().subscribe({
      next: (value: any) => {
        this.recipes = value.result;
        for (const recipe of this.recipes) {
          for (let i = 1; i <= recipe.servings; i++) {
            this.arr.push(i);
          }
          recipe.servings = this.arr;
          this.arr = [];
        }
      },
    });
  }
}
