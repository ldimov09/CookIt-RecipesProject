import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
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

  @Output() newErrorEvent = new EventEmitter<string>();

  errorMessage!: string;

  constructor(private service: AuthService, private recipeService: RecipeService, private router: Router) { }

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
          if(!response.success){
            this.emitError(response.error)
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

