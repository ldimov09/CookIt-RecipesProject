import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  message: string | null = null;
  success: boolean | null = null;

  constructor(private service: AuthService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }

  handleLogin(form: FormGroup) {
    console.log(form.value);
    this.service.loginUser(form.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (!response.success) {
          this.message = response.message;
		  this.success = response.success

          console.log('Login failed', response.error); // Warning! Console.log! Remove later!
        } else {
          console.log('Login successful', response.result); // Warning! Console.log! Remove later!
          const token = response.result; 
          localStorage.setItem('token', token);
          this.router.navigate(['/']);

        }
      },
    });
  }
}
