import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

	constructor(private service: AuthService){

	}

	form = new FormGroup({
		'email': new FormControl('', [Validators.required, Validators.email]),
		'password': new FormControl('', [Validators.required]),
	});

	handleLogin(form: FormGroup){
		console.log(form.value);
		this.service.loginUser(form.value)
		.subscribe({
			next: (response: any) =>{
				console.log(response);
				if(!response.success){
					console.log('Login failed', response.error) // Warning! Console.log! Remove later!
				}else{
					console.log('Login successful', response.result) // Warning! Console.log! Remove later!
					const token = response.result;
					localStorage.setItem('token', token);
				}
			}
		})
	}

}
