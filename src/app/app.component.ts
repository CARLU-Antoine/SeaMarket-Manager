import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { Title } from '@angular/platform-browser';
import {jwtDecode}  from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent{
  title = 'SeaMarket-Manager';

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private titleService: Title
  ) {}

}