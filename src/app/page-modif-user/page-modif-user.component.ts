import { Component } from '@angular/core';
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

export interface tableauUser {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}
// mettre l'appel à la vraie bdd des users
const ELEMENT_DATA: tableauUser[] = [
  { nom: 'Guigz', prenom: "Guigui", email: 'g@gmail.com', role: 'admin'},
  { nom: 'viv', prenom: "vivien", email: 'v@gmail.com', role: 'admin'},
  { nom: 'ant', prenom: "antoine", email: 'a@gmail.com', role: 'admin'},
  { nom: 'pers', prenom: "personne", email: 'p@gmail.com', role: 'user'},

];
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
    MatTableModule,

  ],
  templateUrl: './page-modif-user.component.html',
  styleUrl: './page-modif-user.component.css'
})
export class PageModifUserComponent {
  userForm: FormGroup;
  selectedRole = 'admin';

  constructor(
    private fb: FormBuilder,
    private userService: ModifUserService // Injectez le service ModifUserService
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')!.value;
      const nom= this.userForm.get('motDePasse')!.value;
      const prenom= this.userForm.get('motDePasse')!.value;
      const password = this.userForm.get('motDePasse')!.value;

      this.userService.createUser(email,nom,prenom,password).subscribe(
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

  displayedColumns: string[] = ['nom', 'prenom', 'email', 'role'];
  dataSource = ELEMENT_DATA;
}