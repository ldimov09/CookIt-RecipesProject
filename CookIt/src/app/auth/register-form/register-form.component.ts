import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordValidators } from './password-validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {

  @Output() newErrorEvent = new EventEmitter<string>();

  errorMessage!: string;

  constructor(private service: AuthService, private router: Router) { }

  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required]),
    },
    PasswordValidators.passwordShouldMatch
  );

  get Email() {
    return this.form.get('email')
  }

  get Password() {
    return this.form.get('password')
  }

  get Username() {
    return this.form.get('username')
  }

  get Repass() {
    return this.form.get('repassword')
  }

  handleRegister(form: FormGroup) {
    const { username, email, password } = form.value;
   
    this.service.createUser({ username, email, password, }).subscribe({
      next: (response: any) => {
        if (!response.success) {
          this.emitError(response.error);
        } else {
          const token = response.result;
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
          
        }
      },
    });
  }

  emitError(error: string) {
    this.newErrorEvent.emit(error);
  }
}
