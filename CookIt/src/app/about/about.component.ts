import { Component } from '@angular/core';
import { slide, fade } from '../animation/animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ slide, fade ]
})
export class AboutComponent {

  isModalOpen: boolean = false;

  closeModal() {
    this.isModalOpen = false;
  }

  handleAction() {
    console.log('action')
  }

  openModal() {
    this.isModalOpen = true;
  }
}
