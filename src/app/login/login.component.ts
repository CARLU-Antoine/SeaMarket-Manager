import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [MatFormFieldModule],
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private router: Router) { }
  
  nagivateToSideNav() {
    this.router.navigate(['/sidenav']);
  }
}
