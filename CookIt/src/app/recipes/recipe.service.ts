import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../interfaces/recipe';
import { ITag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient, private service: AuthService) { }

  getAllRecipes() {
    const randomApiId = Math.random();
    return this.http.get<any>('https://www.digitalplant.eu/recipes/api/recipes/all.php?apiId=' + randomApiId);
  }
  getOneRecipe(id:string){
    const randomApiId = Math.random();
    return this.http.get<any>('https://www.digitalplant.eu/recipes/api/recipes/getone.php?id=' + id + '&apiId=' + randomApiId);

  }

  createRecipe(recipe: FormData){
    const randomApiId = Math.random();

    console.log(recipe);

    return this.http.post<any>('https://www.digitalplant.eu/recipes/api/recipes/create.php?apiId=' + randomApiId, recipe);
  }

  createTag(tag: ITag){
    const randomApiId = Math.random();

    //return this.http.post<any>(this.url + 'api/tag/create', tag)
    return this.http.post<any>('https://www.digitalplant.eu/recipes/api/tags/create.php?apiId=' + randomApiId, tag)
  }

  getAllTags() {
    const randomApiId = Math.random();

    //return this.http.get<any>(this.url + 'api/tags');
    return this.http.get<any>("https://www.digitalplant.eu/recipes/api/tags/all.php?apiId=" + randomApiId);
  }

  editTag(tag: ITag){
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/tags/edit.php?apiId=" + randomApiId, tag);
  }
  editRecipe(recipe:any){
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/recipes/edit.php?apiId=" + randomApiId, recipe);
  }

  deleteTag(tag: ITag){
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/tags/delete.php?apiId=" + randomApiId, { id: tag.id});
  }

  reactToRecipe(recipe: IRecipe, reaction: string) {
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/recipes/" + reaction + '.php' +  '?apiId=' + randomApiId, { recipeId: recipe.id, userId: this.service.user.id}); 
  }

  deleteRecipe(recipeId: string) {
    const randomApiId = Math.random();
    
    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/recipes/delete.php?apiId=" + randomApiId, { id: recipeId})
  }

  changeFavoriteStatus(recipeId: string, userId: string, reactionType: number){
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/favorites/change.php?apiId=" + randomApiId, { userId, recipeId, reactionType})

  }

  getUserFavorites(userId: string){
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/favorites/get.php?apiId=" + randomApiId, { userId })
  }

  changeApproved(recipeId: string, type: number){
    const randomApiId = Math.random();

    return this.http.post<any>("https://www.digitalplant.eu/recipes/api/recipes/approve.php?apiId=" + randomApiId, { id: recipeId, approved: type })
  }

  
}
