import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../interfaces/recipe';
import { ITag } from '../interfaces/tag';
import { IUser } from '../interfaces/user';
import { slide, fade } from '../animation/animation';
import { RecipeService } from '../recipes/recipe.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	animations: [ slide, fade ]
})
export class AdminComponent {
	users!: any;
	tags!: ITag[];
	editParams!: any;
	service!: AuthService;
	recipes!: IRecipe[];
	openedTab: string = 'users';
	tagOpenedTab: string = 'create';
	isModalOpen: boolean = false;


	constructor(
		service: AuthService,
		private recipeService: RecipeService,
		private router: Router
	) {
		this.service = service;
	}


	closeModal() {
	  this.isModalOpen = false;
	}
  
	handleAction(recipe: IRecipe): void {
		this.deleteRecipe(recipe);
	}
  
	openModal() {
	  this.isModalOpen = true;
	}

	ngOnInit() {
		this.service.getAllUsers().subscribe({
			next: (response: any) => {
				this.users = response.result;
				this.getAllTags();
			},
			error: () => { },
		});

		this.recipeService.getAllRecipes().subscribe({
			next: (response: any) => {
				this.recipes = response.result;
			},
			error: (error) => {
			},
		});
	}

	getAllTags() {
		this.recipeService.getAllTags().subscribe({
			next: (response: any) => {
				this.tags = response.result;
			},
			error: (error) => {
			},
		});
	}

	handleEditTag(tag: ITag) {
		this.tagOpenedTab = 'edit'
		this.editParams = {
			id: tag.id,
			name: tag.name,
			incompatible: tag.incompatible.join(', '),
		};
	}
	handleDeleteTag(tag: ITag) {
		this.recipeService.deleteTag(tag).subscribe({
			next: (response: any) => {
				this.getAllTags();
			},
			error: (response: any) => { },
		});
	}

	changeUserRole(userId: string, newRole: string) {
		this.service.changeUserRole(userId, newRole).subscribe({
			next: (response: any) => {
				this.users[Number(userId) - 1] = response.result;
			},
			error: (response: any) => { },
		});
	}
	editRecipe(recipe: IRecipe) {
		this.router.navigate([`/edit/${recipe.id}`], { queryParams: { return: true } });
	}


	redierctToDetails(id?: string) {
		this.router.navigate([`/details/${id}`], { queryParams: { return: true } });
	}

	deleteRecipe(recipe: IRecipe) {
		this.recipeService.deleteRecipe(recipe.id!)
			.subscribe({
				next: (response: any) => {
					this.recipeService.getAllRecipes().subscribe({
						next: (response: any) => {
							this.recipes = response.result;
							this.closeModal()
						},
						error: (error) => {
						},
					});
				},
				error: (response: any) => {

				}
			})
	}
}
