import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StringResourcesService } from 'src/app/string-resources.service';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-tag-create-form',
	templateUrl: './tag-create-form.component.html',
	styleUrls: ['./tag-create-form.component.scss']
})
export class TagCreateFormComponent {

	@Output() getAlltags = new EventEmitter<string>();
	@Output() newErrorEvent = new EventEmitter<string>();

	errorMessage!: string;

	strService: StringResourcesService;

	constructor(private service: AuthService, private recipeService: RecipeService, private router: Router, strService: StringResourcesService) {
		this.strService = strService;
		this.router.events.subscribe({
			next: (event: any) => {
			}
		})
	}

	form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		incompatible: new FormControl('', [Validators.required]),
	});

	handleSubmit(form: FormGroup) {

		const incompatibleArray = this.form.value.incompatible!.split(', ');

		const formValue = {
			name: this.form.value.name!,
			incompatible: incompatibleArray,
		};


		this.recipeService.createTag(formValue)
			.subscribe({
				next: (response) => {
					if (!response.success) {
						this.emitError(response.error)
					} else {
						this.getAlltags.emit('getAllTags')
					}
				},
				error: (error) => {
					this.emitError(error);
				}
			})



	}

	emitError(error: string) {
		this.newErrorEvent.emit(error);
	}

}

