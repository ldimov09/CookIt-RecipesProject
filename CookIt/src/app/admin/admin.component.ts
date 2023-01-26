import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ITag } from '../interfaces/tag';
import { IUser } from '../interfaces/user';
import { RecipeService } from '../recipes/recipe.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	users!: any;
	tags!: ITag[];
	editParams!: any;
	service! : AuthService;

	constructor(service: AuthService, private recipeService: RecipeService, ) {
		this.service = service
	}

	ngOnInit() {
		this.service.getAllUsers()
			.subscribe({
				next: (response: any) => {
					this.users = response.result;
					this.getAllTags();
				},
				error: () => {

				}
			})

	}

	getAllTags() {
		this.recipeService.getAllTags()
			.subscribe({
				next: (response: any) => {
					this.tags = response.result
				},
				error: (error) => {
					console.log(error);
				}

			})
	}

	handleEditTag(tag: ITag) {
		this.editParams = {
			id: tag.id,
			name: tag.name,
			incompatible: tag.incompatible.join(', '),
		}
	}
	handleDeleteTag(tag: ITag) {
		this.recipeService.deleteTag(tag)
			.subscribe({
				next: (response: any) => {
					this.getAllTags();
				},
				error: (response: any) => {

				}
			})
	}

	changeUserRole(userId: string, newRole: string) {
		this.service.changeUserRole(userId, newRole)
			.subscribe({
				next: (response: any) => {
					this.users[Number(userId) - 1] = response.result;
				},
				error: (response: any) => {

				}
			})

	}
}
