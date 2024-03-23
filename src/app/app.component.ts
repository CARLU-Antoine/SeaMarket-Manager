import { Component,OnChanges,OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'SeaMarket-Manager';

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
  }

  CheckAccessToken():void{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
      let decodedToken = jwtDecode(accessToken)
      const isExpired = decodedToken && decodedToken.exp ?  decodedToken.exp < Date.now() / 1000 : false;
  
      if(isExpired){
        console.log("le token est expiré");
        localStorage.removeItem('accessToken');
        //router.navigateByUrl('/login');
      }else{
        console.log("le token n'est pas expiré");  
      }
    }else{
      console.log('no token')
      //router.navigateByUrl('/login');
    }
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  // Méthode pour vérifier si la page actuelle est la page de connexion
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}