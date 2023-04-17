import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../interfaces/recipe';
import { ITag } from '../interfaces/tag';
import { Subscription } from 'rxjs';
import { IUser } from '../interfaces/user';
import { slide, fade } from '../animation/animation';
import { RecipeService } from '../recipes/recipe.service';
import { TagEditFormComponent } from '../recipes/tag-edit-form/tag-edit-form.component';
import { TagCreateFormComponent } from '../recipes/tag-create-form/tag-create-form.component';
import { StringResourcesService } from '../string-resources.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	animations: [slide, fade]
})
export class AdminComponent {
	users!: any;
	tags!: ITag[];
	editParams!: any;
	service!: AuthService;
	recipes!: IRecipe[];
	openedTab: string = 'users';
	tagOpenedTab: string = 'create';
	acceptOpenedTab: string = 'accepted';
	isModalOpen: boolean = false;
	recipesPending!: IRecipe[];
	recipesApproved!: IRecipe[];

	strService!: StringResourcesService;


	constructor(
		service: AuthService,
		private recipeService: RecipeService,
		private router: Router,
		strService: StringResourcesService
	) {
		this.strService = strService;
		this.service = service;
		this.router.events.subscribe({
			next: (event: any) => {
			}
		})
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
				console.log(response.result);
				this.getAllTags();
			},
			error: () => { },
		});

		this.recipeService.getAllRecipes().subscribe({
			next: (response: any) => {
				this.recipes = response.result;
				this.recipesPending = this.recipes.filter(r => { if(r.approved == "0") { return true } else { return false }});
				this.recipesApproved = this.recipes.filter(r => { if(r.approved == "1") { return true } else { return false }});							
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

	changeUserRole(userId: string, newRole: string, index: number) {
		console.log(userId);
		this.service.changeUserRole(userId, newRole).subscribe({
			next: (response: any) => {
				this.users[index] = response.result;
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
							this.recipesPending = this.recipes.filter(r => { if(r.approved == "0") { return true } else { return false }});
							this.recipesApproved = this.recipes.filter(r => { if(r.approved == "1") { return true } else { return false }});	
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

	reject(recipe: IRecipe) {
		this.recipeService.changeApproved(recipe.id!, 0).subscribe({
			next: () => {
				const index = this.recipesApproved.findIndex(r => {
					return r.id === recipe.id
				})
				this.recipesApproved.splice(index, 1);
				this.recipesPending.push(recipe);
			},
			error: () => {

			}
		})
	}

	accept(recipe: IRecipe) {
		this.recipeService.changeApproved(recipe.id!, 1).subscribe({
			next: () => {
				const index = this.recipesPending.findIndex(r => {
					return r.id === recipe.id
				})
				this.recipesPending.splice(index, 1);
				this.recipesApproved.push(recipe);
			},
			error: () => {

			}
		})
	}

	subscription!: Subscription;

	subscribeToEventEmitter(elementRef: any) {
		console.log('tuk2')
		if (elementRef instanceof TagEditFormComponent || elementRef instanceof TagCreateFormComponent) {
			const child: TagCreateFormComponent | TagEditFormComponent = elementRef;

			child.getAlltags.subscribe((response: any) => {
				this.getAllTags();
			})
		}

	}

	unsubscribeFromEventEmitter() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
