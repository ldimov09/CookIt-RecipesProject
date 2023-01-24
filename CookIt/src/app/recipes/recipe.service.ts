import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from '../interfaces/recipe';
import { ITag } from '../interfaces/tag';

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
    return this.http.post<any>('https://www.digitalplant.eu/recipes/api/recipes/create.php', recipe);
  }

  createTag(tag: ITag){
    //return this.http.post<any>(this.url + 'api/tag/create', tag)
    return this.http.post<any>('https://www.digitalplant.eu/recipes/api/tags/create.php', tag)
  }

  getAllTags() {
    //return this.http.get<any>(this.url + 'api/tags');
    return this.http.get<any>("https://www.digitalplant.eu/recipes/api/tags/all.php");
  }

  editTag(tag: ITag){
    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/tags/edit.php", tag);
  }

  deleteTag(tag: ITag){
    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/tags/delete.php", { id: tag.id});
  }
}
