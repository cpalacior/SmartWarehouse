import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent {

  constructor(private router: Router) { }

  navigateToLogin() {
    window.open('http://localhost:4200/')
  }


}
