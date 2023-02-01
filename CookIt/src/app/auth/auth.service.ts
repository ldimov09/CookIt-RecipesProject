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
    const user = helper.decodeToken(token);

    return user.data;
  }

 

  loginUser(payload: { email: string; password: string }) {
    const randomApiId = Math.random();

    //return this.http.post(this.url + 'login', payload);
    return this.http.post("https://www.digitalplant.eu/recipes/api/auth/login.php?apiId=" + randomApiId, payload);

  }

  createUser(payload: {username:string, email: string; password: string, }) {
    const randomApiId = Math.random();
    
    //return this.http.post(this.url + 'register', payload);
    return this.http.post("https://www.digitalplant.eu/recipes/api/auth/register.php?apiId=" + randomApiId, payload);
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  }

  getAllUsers() {
    //return this.http.get(this.url + "users");
    const randomApiId = Math.random();

    return this.http.get("https://www.digitalplant.eu/recipes/api/auth/all.php?apiId=" + randomApiId);
  }

  changeUserRole(userId: string, role: string) {
    const randomApiId = Math.random();

    return this.http.post("https://www.digitalplant.eu/recipes/api/auth/editrole.php?apiId=" + randomApiId, { userId, newRole: role });
  }
}
