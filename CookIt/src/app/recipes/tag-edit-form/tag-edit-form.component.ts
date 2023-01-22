import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ITag } from 'src/app/interfaces/tag';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-tag-edit-form',
  templateUrl: './tag-edit-form.component.html',
  styleUrls: ['./tag-edit-form.component.scss']
})
export class TagEditFormComponent {
  @Input() editParams: any = ''

  @Output() newErrorEvent = new EventEmitter<string>();

  errorMessage!: string;

  constructor(private service: AuthService, private recipeService: RecipeService, private router: Router) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    incompatible: new FormControl('', [Validators.required]),
  });

  ngOnChanges() {
    if(this.editParams!){
      this.form.patchValue(this.editParams!)
    }
  }

  handleSubmit(form: FormGroup) {
    const formValue = {
      id: this.editParams.id,
      name: this.form.value.name!,
      incompatible: this.form.value.incompatible?.split(', ')!

    }

    this.recipeService.editTag(formValue)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
