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
  
  constructor(private fb: FormBuilder,private router: Router) {
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
      // Réinitialiser le formulaire après soumission
      this.router.navigate(['/dashboard']);
    }
  }
}
