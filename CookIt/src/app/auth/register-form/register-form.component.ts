import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PasswordValidators } from './password-validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  constructor(private service: AuthService) {}

  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required]),
    },
    PasswordValidators.passwordShouldMatch
  );

  handleRegister(form: FormGroup) {
    const { username, email, password } = form.value;
    this.service.createUser({ username, email, password }).subscribe({
      next: (response: any) => {
        if (!response.success) {
          console.log('Register failed', response.error); // Warning! Console.log! Remove later!
        } else {
          console.log('Register successful', response.result); // Warning! Console.log! Remove later!
          const token = response.result;
          localStorage.setItem('token', token);
        }
      },
    });
  }
}
