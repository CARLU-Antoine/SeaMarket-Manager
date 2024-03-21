import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import du CommonModule
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from '../services/login.service';

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
export class SidenavComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  
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
<<<<<<< HEAD
    this.router.navigate(['/analyse']);
=======
    this.router.navigate(['/analyseMarket']);
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
>>>>>>> main
  }
}