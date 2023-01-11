import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    return this.http.get<any>(this.url + 'api/recipes');
  }

  createRecipe(recipe: IRecipe){
    console.log(recipe);
    return this.http.post<any>(this.url + 'api/recipes/create', recipe);
  }

}
