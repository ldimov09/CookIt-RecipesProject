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

  constructor(private service: AuthService, private recipeService: RecipeService) {

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
    console.log(this.editParams)
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
}
