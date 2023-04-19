import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ITag } from 'src/app/interfaces/tag';
import { IUser } from 'src/app/interfaces/user';
import { StringResourcesService } from 'src/app/string-resources.service';
import { RecipeService } from '../recipe.service';
import {videoUrls } from '../../video-urls'
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  recipes!: IRecipe[];
  recipesShowing: IRecipe[] = [];
  arr: any = [];
  user: IUser = {
    id: '',
    name: '',
    email: '',
    reports: 0,
    myRecipes: [],
  };
  service!: AuthService;
  allTags!: ITag[];
  strService!: StringResourcesService;
  isLoading: boolean = true;
  videoUrls= videoUrls
  url = '';

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

  form = new FormGroup({
    searchTag: new FormControl('', []),
  });

  handleSearch(form: FormGroup) {
    console.log(this.form.value);

    this.search(this.form.value.searchTag!);
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

        this.isLoading = false;

        this.getAllTags();
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

  getAllTags() {
    this.recipeService.getAllTags().subscribe({
      next: (allTags) => {
        this.allTags = allTags.result;
        this.searchByTag(
          this.activatedRoute.snapshot.queryParamMap.get('search')
            ? this.activatedRoute.snapshot.queryParamMap.get('search')!
            : ''
        );
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

  search(tag: string) {
    console.log('tuk');
    if (tag !== '') {
      this.recipesShowing = this.recipes.filter((r) => r.tags.includes(tag));
    } else {
      this.recipesShowing = this.recipes;
    }
  }

  searchByTag(tag: string) {
    this.form.setValue({
      searchTag: tag,
    });

    this.search(tag);
  }

  changeFavoriteStatus(recipeId: string, newStatus: number) {
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
