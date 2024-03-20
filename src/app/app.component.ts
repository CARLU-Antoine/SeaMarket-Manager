import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
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

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Vérifiez le statut de connexion lors de l'initialisation du composant racine
    if (!this.isLoggedIn() && !this.isLoginPage()) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      this.router.navigate(['/login']);
    } else if (this.loginService.compareRefreshTokenWithUrlToken()) {
      // Comparer le token d'actualisation de l'URL Django avec celui dans le localStorage
      // Les tokens correspondent, rediriger vers le tableau de bord
      this.router.navigate(['/dashboard']);
    } else {
      // Les tokens ne correspondent pas, rediriger vers la page de connexion
      this.router.navigate(['/login']);
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