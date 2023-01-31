import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ITag } from 'src/app/interfaces/tag';
import { RecipeService } from '../recipe.service';

const url: string = 'http://digitalppant.eu/recipes/api';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private service: AuthService,
    private router: Router
  ) { }
  id: string = this.activatedRoute.snapshot.params?.['id'];
  recipe!: IRecipe; //What is this? More self explaing variable names!
  ngOnInit() {
    this.recipeService.getAllTags().subscribe({
      next: (allTags) => {
        this.allTagsTemp = allTags;
        this.allTagsTemp.result.map((tag: ITag) => {
          this.allTags[tag.name!] = {
            id: tag.id,
            checked: false,
            incompatible: tag.incompatible,
          };
        });
        this.allTagsShowin = this.allTags;
        this.keys = Object.keys(this.allTags);
        this.allTagsShowingKeys = Object.keys(this.allTagsShowin);
      },
      error: (error) => {
      },
    });

    this.recipeService.getOneRecipe(this.id).subscribe({
      next: (response: any) => {

        this.recipe = response.result;
        
        for (let tag of this.recipe.tags) {
          this.allTags[tag].checked = true
        }

        this.selectedTagsKeys = this.recipe.tags;
        this.recipeIngredients = this.recipe.ingredients;

        this.form.patchValue({
          title: this.recipe.title,
          cooktime: this.recipe.cooktime as unknown as string,
          servings: this.recipe.servings,
          description: this.recipe.description,
          imageurl: this.recipe.imageurl,
        });
      },

      error: (error) => {
      },
    });
  }
  allTagsTemp!: any;
  allTags: any = {};
  allTagsShowin: any = {};
  allTagsShowingKeys: string[] = [];
  keys: any;
  selectedTagsKeys!: string[];
  allTagsIds!: string[];


  recipeIngredients!: string[];

  showTagMenu = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageurl: new FormControl('', [Validators.required]),
    servings: new FormControl('', [Validators.required]),
    cooktime: new FormControl('', [Validators.required]),


  });
  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get imageUrl() {
    return this.form.get('imageurl');
  }
  get servings() {
    return this.form.get('servings');
  }
  get cooktime() {
    return this.form.get('cookTime');
  }

  toggleTag(tag: string) {
    const tagObj = this.allTags[tag];

    tagObj.checked = !tagObj.checked;

    for (tag of tagObj.incompatible) {
      if (this.allTags[tag].checked) {
        this.allTags[tag].checked = false;
      }
    }


    this.selectedTagsKeys = [];

    for (let key in this.allTags) {
      if (this.allTags[key].checked) {
        this.selectedTagsKeys.push(key);
      }
    }
    this.allTagsShowin = {};
    for (let key in this.allTags) {
      if (!this.allTags[key].checked) {
        this.allTagsShowin[key] = this.allTags[key];
      }
    }
    this.allTagsShowingKeys = Object.keys(this.allTagsShowin);
    this.showTagMenu = false;
  }

  toggleTagMenu() {
    this.showTagMenu = !this.showTagMenu;
  }

  addIngredient(ingInp: HTMLInputElement) {
    this.recipeIngredients.push(ingInp.value);
  }
  removeIng(ing: string) {
    this.recipeIngredients.splice(this.recipeIngredients.indexOf(ing), 1);
  }
  handleEdit(form: FormGroup) {
    const recipe = form.value;
    recipe['id'] = this.recipe.id;
    recipe['owner'] = this.recipe.owner;
    recipe['tags'] = this.selectedTagsKeys.map(key => this.allTags[key].id);
    recipe['ingredients'] = this.recipeIngredients;
    recipe['comments'] = this.recipe.comments;
    recipe['likes'] = this.recipe.likes;
    recipe['dislikes'] = this.recipe.dislikes;
    recipe['cooktime'] = this.form.value.cooktime;
    recipe['servings'] = this.form.value.servings;
    recipe['description'] = this.form.value.description;
    console.log(recipe);

    this.recipeService.editRecipe(recipe).subscribe({
      next: (response: any) => {
        //console.log(response.result);
        if(response.success) {
          if(this.service.user.role === 'admin' || this.service.user.role ===  'superadmin'){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/recipes']);
          }
        }
      },
      error: (error) => {
        //console.log(error);
      },
    });
  }
}
