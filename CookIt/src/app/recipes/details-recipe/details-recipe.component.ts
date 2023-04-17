import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { IUser } from 'src/app/interfaces/user';
import { StringResourcesService } from 'src/app/string-resources.service';
import { slide, fade } from '../../animation/animation';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-details-recipe',
	templateUrl: './details-recipe.component.html',
	styleUrls: ['./details-recipe.component.scss'],
	animations: [slide, fade]
})
export class DetailsRecipeComponent implements OnInit {
	recipes!: IRecipe[];
	service!: AuthService;
	router!: Router;
	isModalOpen: boolean = false;
	strService: StringResourcesService;
	videoUrls: any = {
		'56': 'https://google.com',
	  };
	  url = '';
	user: IUser = {
		id: "",
		name: "",
		email: "",
		reports: 0,
		myRecipes: [],
	  };
	constructor(
		private activatedRoute: ActivatedRoute,
		private recipeService: RecipeService,
		service: AuthService,
		router: Router,
		strService: StringResourcesService
	) {
		this.service = service;
		this.router = router;
		this.strService = strService;
	}
	reactionRecipe!: any;
	id: string = this.activatedRoute.snapshot.params?.['id'];
	returnToAdmin: boolean = Boolean(this.activatedRoute.snapshot.queryParamMap.get('return'))

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


	ngOnInit(): void {
		this.recipeService.getOneRecipe(this.id).subscribe({
			next: (response: any) => {
				
				
				
				this.recipe = response.result;
				this.reactionRecipe = response.result;
				this.recipe.servings = Number(this.recipe.servings)
				this.service.getUserById(this.service.user.id).subscribe({
					next: (res: any) => {
						this.user = res.result;
					},
					error: () => {}				
				})
			},
			error: (error: string) => {
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


					response.result.cooktime = Number(response.result.cooktime);
					response.result.servings = Number(response.result.servings);

					this.recipe = response.result;

				}
			},
		});
	}

	searchAndRedirect(tag: string) {
		this.router.navigate(['/recipes'], { queryParams: { search: tag } })
	}

	deleteRecipe(recipe: IRecipe) {
		this.recipeService.deleteRecipe(recipe.id!)
			.subscribe({
				next: (response: any) => {
					this.closeModal()
					this.router.navigate(['/recipes'])
				},
				error: (response: any) => {

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
	changeFavoriteStatus(recipeId: string, newStatus: number) {


		this.recipeService.changeFavoriteStatus(recipeId, this.user.id, newStatus).subscribe({
			next: (response: any) => {
				this.user = response.result;
			},
			error: () => {

			}
		})
	}



}
