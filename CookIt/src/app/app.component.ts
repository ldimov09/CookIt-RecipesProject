import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { TagCreateFormComponent } from './recipes/tag-create-form/tag-create-form.component';
import { StringResourcesService } from './string-resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  strService: StringResourcesService;

  constructor(private router: Router, strService: StringResourcesService){
    this.strService = strService;
    this.router.events.subscribe({
      next: (event: any) => {
          this.showWarning = false;
      }
    })
  }

  title = 'Jobs-MG';

  error!: string;
  subscription!: Subscription;
  showWarning: boolean = false;

  subscribeToEventEmitter(elementRef: any) {
    if(elementRef instanceof RegisterFormComponent || elementRef instanceof LoginFormComponent || elementRef instanceof TagCreateFormComponent){
      const child: LoginFormComponent | RegisterFormComponent | TagCreateFormComponent  = elementRef;
      
      child.newErrorEvent.subscribe((response) => {
        this.error = response;
        this.showWarning = true;
      })}

  }

  unsubscribeFromEventEmitter() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeAlert() {
    this.showWarning = false;
  }
}

