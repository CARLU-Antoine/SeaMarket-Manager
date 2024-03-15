import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    SidenavComponent,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    CommonModule
  ],
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private LoginService: LoginService, private router: Router) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')!.value;
      const password = this.userForm.get('motDePasse')!.value;

      this.LoginService.login(email, password).subscribe(
        (response) => {
          // Connexion réussie - Stockez le jeton JWT dans le stockage local ou dans un service d'authentification
          const accessToken = response.access;
          const refreshToken = response.refresh;
          console.log(accessToken);
          // Stockez les jetons dans le stockage local ou dans un service d'authentification
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          // Rediriger vers la page de dashboard
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Erreur de connexion - Gérez l'erreur
          console.error('Erreur de connexion:', error);
          // Afficher un message d'erreur à l'utilisateur, par exemple, utiliser un service de notification
        }
      );
    }
  }
}