import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ITag } from 'src/app/interfaces/tag';
import { StringResourcesService } from 'src/app/string-resources.service';
import { RecipeService } from '../recipe.service';

const url: string = 'http://digitalppant.eu/recipes/api';
@Component({
	selector: 'app-edit-recipe',
	templateUrl: './edit-recipe.component.html',
	styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
	strService: StringResourcesService;

	constructor(private service: AuthService, private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, strService: StringResourcesService) { 
		this.strService = strService;

	}
	id: string = this.activatedRoute.snapshot.params?.['id'];
	recipe: IRecipe = {
		owner: "",
		tags: [],
		description: "",
		ingredients: [],
		imageurl: '',
		title: "",
		servings: 0,
		cooktime: 0,

	};
 
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
				this.getOneRecipe();
			},
			error: (error) => {
			},
		});


	}

	getOneRecipe() {
		this.recipeService.getOneRecipe(this.id).subscribe({
			next: (response: any) => {

				this.recipe = response.result;

				for (let tag of this.recipe.tags) {
					this.allTags[tag].checked = true
				}

				this.selectedTagsKeys = this.recipe.tags;
				this.recipeIngredients = this.recipe.ingredients;

				console.log(this.recipe);

				this.form.patchValue({
					title: this.recipe.title,
					cooktime: this.recipe.cooktime as unknown as string,
					servings: this.recipe.servings,
					description: this.recipe.description,
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
	returnToAdmin: boolean = Boolean(this.activatedRoute.snapshot.queryParamMap.get('return'))

	selectedFile: File | null = null;

	recipeIngredients!: string[];

	showTagMenu = false;

	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		image: new FormControl(null, []),
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

	onFileSelected(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			if (file) {
				this.selectedFile = file; // Store the file in the selectedFile property
			}
		}
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
		/*const recipe = form.value;
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
		recipe['descriimageption'] = this.form.value.description;
		console.log(recipe);*/

		const formData = new FormData();
		formData.append('id', this.recipe.id!);
		formData.append('title', this.form.value.title!);
		formData.append('description', this.form.value.description!);
		formData.append('tags', JSON.stringify(this.selectedTagsKeys.map(key => this.allTags[key].id)));
		formData.append('ingredients', JSON.stringify(this.recipeIngredients));
		if (this.selectedFile != null) {
			formData.append('image', this.selectedFile);
		}
		formData.append('cooktime', this.form.value.cooktime!);
		formData.append('servings', this.form.value.servings!);

		this.recipeService.editRecipe(formData).subscribe({
			next: (response: any) => {
				//console.log(response.result);
				if (response.success) {

					if (this.returnToAdmin) {
						this.router.navigate(['/details/' + this.recipe.id], { queryParams: { return: true } })
					} else {
						this.router.navigate(['/details/' + this.recipe.id])
					}

				}
			},
			error: (error) => {
				//console.log(error);
			},
		});
	}
}
