import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent {
  constructor(private service: AuthService, private recipeService: RecipeService, private router: Router) { }

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    ingredients: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  handleCreate(form: FormGroup) {
    const formValue = {
      owner: this.service.user._id,
      title: this.form.value.title!,
      description: this.form.value.description!,
      tags: [this.form.value.tags!],
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
}

