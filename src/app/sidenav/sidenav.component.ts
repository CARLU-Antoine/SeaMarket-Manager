import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatCardModule,MatIconModule,MatMenuModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private router: Router) { }
  
  nagivateToHome() {
    this.router.navigate(['']);
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
    this.router.navigate(['/Analyse']);
  }
}