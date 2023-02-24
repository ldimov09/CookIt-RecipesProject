import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StringResourcesService } from 'src/app/string-resources.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  message: string | null = null;
  success: boolean | null = null;

  @Output() newErrorEvent = new EventEmitter<string>();

  errorMessage!: string;
  strService: StringResourcesService;

  constructor(private service: AuthService, private router: Router, strService: StringResourcesService) {
    this.strService = strService;
  }

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
    this.service.loginUser(form.value).subscribe({
      next: (response: any) => {
        if (!response.success) {
          this.message = response.error;
          this.success = response.success

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
