import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ModifUserService } from '../services/modif-user.service';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

export interface tableauUser {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-page-modif-user',
  standalone: true,
  imports: [
    CommonModule,
    SidenavComponent,
    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './page-modif-user.component.html',
  styleUrl: './page-modif-user.component.css'
})
export class PageModifUserComponent implements OnInit {
  userForm: FormGroup;
  selectedRole = 'admin';
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'role'];
  dataSource: MatTableDataSource<tableauUser>;

  constructor(
    private fb: FormBuilder,
    private userService: ModifUserService
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
    this.dataSource = new MatTableDataSource<tableauUser>();
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: tableauUser[]) => {
      this.dataSource.data = data;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')!.value;
      const lastName = this.userForm.get('nom')!.value;
      const firstName = this.userForm.get('prenom')!.value;
      const password = this.userForm.get('motDePasse')!.value;
      const role = this.userForm.get('role')!.value;
      const isAdmin = role === "admin";

      this.userService.createUser(email, firstName, lastName, password, isAdmin).subscribe(
        response => {
          console.log('Utilisateur modifié avec succès!', response);
          // Réinitialiser le formulaire après soumission
          // this.userForm.reset();
        },
        error => {
          console.error('Erreur lors de la modification de l\'utilisateur', error);
        }
      );
    }
  }
}
