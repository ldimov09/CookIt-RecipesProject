import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ITag } from 'src/app/interfaces/tag';
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

	showTagMenu = false;

	/*

	'Healthy': { checked: false, incompatible: ['Fried', 'Deep Fried', 'Junk Food'] },
		'Vegan': { checked: false, incompatible: ['Meat', 'Vegetarian', 'Fish'] },
		'Healthy Smoothie': { checked: false, incompatible: ['Junk Food', 'Fried', 'Deep Fried'] },
		'Vegetarian': { checked: false, incompatible: ['Meat', 'Vegan'] },
		'Fruit Smoothie': { checked: false, incompatible: ['Juice', 'Coffee'] },
		'Fruit Salad': { checked: false, incompatible: [] },
		'High Protein': { checked: false, incompatible: [] },
		'Sugar Free': { checked: false, incompatible: ['Sweet', 'Cake'] },
		'Diary Free': { checked: false, incompatible: [] },
		'Gluten Free': { checked: false, incompatible: [] },
		'Salad': { checked: false, incompatible: [] },
		'Soup': { checked: false, incompatible: [] },
		'Dressing': { checked: false, incompatible: [] },
		'BBQ': { checked: false, incompatible: ['Healthy', 'Healthy Smoothie'] },
		'Pasta': { checked: false, incompatible: [] },
		'Junk Food': { checked: false, incompatible: ['Healthy', 'Healthy Smoothie'] },
		'Meat': { checked: false, incompatible: ['Vegan', 'Vegatarian'] },
		'Dessert': { checked: false, incompatible: [] },
		'Pizza': { checked: false, incompatible: [] },
		'Kid\'s Meal': { checked: false, incompatible: [] },
		'Sweet': { checked: false, incompatible: ['Sugar Free'] },
		'Quick': { checked: false, incompatible: ['Time-consuming'] },
		'Cake': { checked: false, incompatible: ['Sugar Free'] },
		'Microwave': { checked: false, incompatible: [] },
		'Time-consuming': { checked: false, incompatible: ['Quick'] },
		'Hot Drink': { checked: false, incompatible: ['Cold Drink'] },
		'Cold Drink': { checked: false, incompatible: ['Hot Drink'] },
		'Coffee': { checked: false, incompatible: ['Juice', 'Fruit Smoothie'] },
		'Juice': { checked: false, incompatible: ['Fruit Smoothie', 'Coffee'] },
		'Fried': { checked: false, incompatible: ['Deep Fried', 'Healthy', 'Healthy Smoothie'] },
		'Deep Fried': { checked: false, incompatible: ['Fried', 'Healthy', 'Healthy Smoothie'] },
		'Baked': { checked: false, incompatible: [] },
		'Boiled': { checked: false, incompatible: [] },
		'Stewed': { checked: false, incompatible: [] },
		'Smoked': { checked: false, incompatible: [] },
		'Cookies': { checked: false, incompatible: [] },
		'Fish': { checked: false, incompatible: ['Vegan'] },
		'Basic': { checked: false, incompatible: ['Easy', 'Advanced', 'For Chefs'] },
		'Easy': { checked: false, incompatible: ['Basic', 'Advanced', 'For Chefs'] },
		'Advanced': { checked: false, incompatible: ['Easy', 'Basic', 'For Chefs'] },
		'For Chefs': { checked: false, incompatible: ['Easy', 'Basic', 'Advanced'] },


	*/

	// ^^^ This monstrosity up here is temporary. It will be removed later. ^^^


	constructor(private service: AuthService, private recipeService: RecipeService, private router: Router) { }

	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		tags: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		ingredients: new FormControl('', [Validators.required]),
		imageUrl: new FormControl('', [Validators.required]),
	});

	ngOnInit() {
		this.recipeService.getAllTags()
			.subscribe({
				next: (allTags) => {
					this.allTagsTemp = allTags;
					this.allTagsTemp.result.map((tag: ITag) => {
						this.allTags[tag.name!] = {
							checked: false,
							incompatible: tag.incompatible
						}
					})
					this.allTagsShowin = this.allTags;
					console.log(this.allTags);
					this.keys = Object.keys(this.allTags);
					this.allTagsShowingKeys = Object.keys(this.allTagsShowin);
				},
				error: (error) => {
					console.log(error);
				}
			})



	}

	handleCreate(form: FormGroup) {
		const selectedTags = []
		for (let key in this.allTags) {
			if (this.allTags[key].checked) {
				selectedTags.push(key);
			}
		}
		const formValue = {
			owner: this.service.user._id,
			title: this.form.value.title!,
			description: this.form.value.description!,
			tags: selectedTags,
			ingredients: [this.form.value.ingredients!],
			imageUrl: this.form.value.imageUrl!
		};
		this.recipeService.createRecipe(formValue)
			.subscribe({

				next: (response: any) => {
					console.log(response); //Waring console.log! TODO: Remove this!
				},
				error: (err) => {
					console.log('Subscribe', err); //Waring console.log! TODO: Remove this!
				}
			})
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


}

