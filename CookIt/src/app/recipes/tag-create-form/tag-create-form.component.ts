import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-tag-create-form',
  templateUrl: './tag-create-form.component.html',
  styleUrls: ['./tag-create-form.component.scss']
})
export class TagCreateFormComponent {

  constructor(private service: AuthService, private recipeService: RecipeService, private router: Router) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    incompatible: new FormControl('', [Validators.required]),
  });

  handleSubmit(form: FormGroup) {

    const incompatibleArray = JSON.parse(this.form.value.incompatible!.replaceAll('\'', '"'));

    const formValue = {
      name: this.form.value.name!,
      incompatible: incompatibleArray,
    };

    console.log(formValue);
  
    
    this.recipeService.createTag(formValue)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    

    
  }
  
}

