import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import du CommonModule
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from '../services/login.service';
import {jwtDecode}  from 'jwt-decode';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  constructor(private loginService: LoginService, private router: Router) {}
  
  ngOnInit(): void {
      this.CheckAccessToken()
  }
  nagivateToLogin() {
    this.router.navigate(['/login']);
  }
  nagivateToModifUser() {
    this.router.navigate(['/modifUser']);
  }
  nagivateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  nagivateToProduit() {
    this.router.navigate(['/tabProduits']);
  }
  nagivateToAnalyse() {
    this.router.navigate(['/analyseMarket']);
  }

CheckAccessToken(): void {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    let decodedToken = jwtDecode(accessToken);
    const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;

    if (isExpired) {
      console.log("Le token est expiré");
      if (refreshToken) {
        // Utiliser le refresh token pour obtenir un nouveau access token
        this.loginService.refreshToken(refreshToken).subscribe(
          (response) => {
            const newAccessToken = response.access;
            localStorage.setItem('accessToken', newAccessToken);
            console.log("Nouveau token obtenu avec succès !");
            // Vous pouvez rediriger l'utilisateur vers la page précédente ou vers un autre endroit approprié
          },
          (error) => {
            console.log("Erreur lors de l'obtention d'un nouveau token :", error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.router.navigateByUrl('/login');
          }
        );
      } else {
        console.log("Aucun refresh token disponible. Déconnexion de l'utilisateur.");
        localStorage.removeItem('accessToken');
        this.router.navigateByUrl('/login');
      }
    } else {
      console.log("Le token n'est pas expiré");
    }
  }
}


   // Méthode pour vérifier si l'utilisateur est connecté
   isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  // Méthode appelée lors du clic sur le bouton de déconnexion
  logout(): void {
    this.loginService.logout(); // Appel de la méthode de déconnexion du service
    // Redirection vers la page de connexion ou une autre page appropriée
    this.router.navigate(['/login']);
  }
}