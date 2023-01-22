import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient) {}

  get user() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();

    return helper.decodeToken(token);
  }

  loginUser(payload: { email: string; password: string }) {
    //return this.http.post(this.url + 'login', payload);
    return this.http.post("https://www.digitalplant.eu/recipes/api/auth/login.php", payload);

  }

  createUser(payload: {username:string, email: string; password: string, }) {
    //return this.http.post(this.url + 'register', payload);
    return this.http.post("https://www.digitalplant.eu/recipes/api/auth/register.php", payload);
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  }

  getAllUsers() {
    return this.http.get(this.url + "users");
  }
}
