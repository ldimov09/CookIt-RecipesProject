import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotloggedGuard implements CanActivate {
  constructor(private router: Router, private service: AuthService) {}

  canActivate(route: any, state: RouterStateSnapshot) {
    if (!this.service.isLoggedIn()) return true;
    this.router.navigate(['/'], { queryParams: { guard: true } });
    return false;
  }
}
