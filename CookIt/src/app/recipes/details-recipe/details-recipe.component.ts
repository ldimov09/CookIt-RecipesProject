import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-details-recipe',
	templateUrl: './details-recipe.component.html',
	styleUrls: ['./details-recipe.component.scss'],
})
export class DetailsRecipeComponent implements OnInit {
	recipes!: IRecipe[];
	service!: AuthService;
	router!: Router;
	constructor(
		private activatedRoute: ActivatedRoute,
		private recipeService: RecipeService,
		service: AuthService,
		router: Router
	) {
		this.service = service;
		this.router = router;
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
			},
			error: (error: string) => {
			},
		});

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

	searchAndRedirect(tag: string){
		this.router.navigate(['/recipes'], { queryParams: { search: tag }} )
	}


}
