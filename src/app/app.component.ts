import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit {
  title = 'SeaMarket-Manager';

  constructor(private loginService: LoginService, 
    private router: Router,
    private titleService: Title) {}

  ngOnInit(): void {
    
    // Vérifiez le statut de connexion lors de l'initialisation du composant racine
    if (!this.isLoggedIn() && !this.isLoginPage()) {
      this.router.navigate(['/login']);
    }else {
      this.router.navigate(['/dashboard']);
    }
    // Définir le titre de l'application
    this.titleService.setTitle('SeaMarket-Manager');
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