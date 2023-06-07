import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ITag } from 'src/app/interfaces/tag';
import { StringResourcesService } from 'src/app/string-resources.service';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-create-recipe',
	templateUrl: './create-recipe.component.html',
	styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

	allTagsTemp!: any;
	allTags: any = {};
	allTagsShowin: any = {};
	allTagsShowingKeys: string[] = [];
	keys: any;
	selectedTagsKeys: string[] = [];

	recipeIngredients: string[] = [];

	showTagMenu = false;

	strService: StringResourcesService;

	selectedFile: File | null = null;

	constructor(private service: AuthService, private recipeService: RecipeService, private router: Router, strService: StringResourcesService) {
		this.strService = strService;

	}

	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		imageUrl: new FormControl('', []),
		image: new FormControl(null, [Validators.required]),
		servings: new FormControl('', [Validators.required]),
		cooktime: new FormControl('', [Validators.required]),
	});
	get title() {
		return this.form.get('title')
	}
	get description() {
		return this.form.get('description')
	}
	get imageUrl() {
		return this.form.get('imageUrl')
	}
	get servings() {
		return this.form.get('servings')
	}
	get cookTime() {
		return this.form.get('cookTime')
	}

	ngOnInit() {
		this.recipeService.getAllTags()
			.subscribe({
				next: (allTags) => {
					this.allTagsTemp = allTags;
					this.allTagsTemp.result.map((tag: ITag) => {
						this.allTags[tag.name!] = {
							id: tag.id,
							checked: false,
							incompatible: tag.incompatible
						}
					})
					this.allTagsShowin = this.allTags;
					this.keys = Object.keys(this.allTags);
					this.allTagsShowingKeys = Object.keys(this.allTagsShowin);
				},
				error: (error) => {
				}
			})



	}

	handleCreate(form: FormGroup) {


		const selectedTags = []
		for (let key in this.allTags) {
			if (this.allTags[key].checked) {
				selectedTags.push(this.allTags[key].id);
			}
		}

		const formData = new FormData();
		formData.append('owner', this.service.user.id);
		formData.append('title', this.form.value.title!);
		formData.append('description', this.form.value.description!);
		formData.append('tags', JSON.stringify(selectedTags));
		formData.append('ingredients', JSON.stringify(this.recipeIngredients));
		formData.append('imageurl', this.form.value.imageUrl!);
		if (this.selectedFile != null) {
			formData.append('image', this.selectedFile);
		}
		formData.append('cooktime', this.form.value.cooktime!);
		formData.append('servings', this.form.value.servings!);

		/*
		const formValue = {
			owner: this.service.user.id,
			title: this.form.value.title!,
			description: this.form.value.description!,
			tags: selectedTags,
			ingredients: this.recipeIngredients!,
			imageurl: this.form.value.imageUrl!,
			image: this.selectedFile,
			cooktime: Number(this.form.value.cooktime)!,
			servings: this.form.value.servings
		};
		*/

		this.recipeService.createRecipe(formData)
			.subscribe({

				next: (response: any) => {
					if (response.success) {
						this.router.navigate(['/recipes'])
					}

				},
				error: (err) => {

				}
			})
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

	toggleTag(tag: string) {

		const tagObj = this.allTags[tag];

		tagObj.checked = !tagObj.checked;


		for (tag of tagObj.incompatible) {
			if (this.allTags[tag].checked) {
				this.allTags[tag].checked = false;
			}
		}

		this.selectedTagsKeys = []

		for (let key in this.allTags) {
			if (this.allTags[key].checked) {
				this.selectedTagsKeys.push(key);
			}
		}
		this.allTagsShowin = {}
		for (let key in this.allTags) {
			if (!this.allTags[key].checked) {
				this.allTagsShowin[key] = this.allTags[key];
			}
		}
		this.allTagsShowingKeys = Object.keys(this.allTagsShowin);
		this.showTagMenu = false




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
	

}

