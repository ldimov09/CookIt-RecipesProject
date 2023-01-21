import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  users!: any;

  constructor(private service: AuthService) {

  }

  ngOnInit() {
    this.service.getAllUsers() 
      .subscribe({
        next: (response: any) => {
          this.users = response.result;
        },
        error: () => {

        }
      })

  }
}
