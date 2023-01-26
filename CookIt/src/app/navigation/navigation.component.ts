import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  role!: string;
  service!: AuthService;
  isShowDivIf = true;

  constructor(private router: Router, service: AuthService) {
    this.service = service;
    this.role = this.service.user.role!;
    console.log(this.role);
  }

  ngOnInit(): void {}

  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
}
