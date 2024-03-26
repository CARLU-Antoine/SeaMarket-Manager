import { Component,OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
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
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';



export interface tableauUser {
  id : number,
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
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
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './page-modif-user.component.html',
  styleUrl: './page-modif-user.component.css'
})
export class PageModifUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userForm: FormGroup;
  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'isAdmin', 'delete'];
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
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.userService.getUsers().subscribe((data: tableauUser[])  => {
      this.dataSource.data = data.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      }));
      this.dataSource.paginator = this.paginator;
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')!.value;
      const lastName = this.userForm.get('nom')!.value;
      const firstName = this.userForm.get('prenom')!.value;
      const password = this.userForm.get('motDePasse')!.value;
      const role = this.userForm.get('role')!.value;
      let isAdmin = false;
  
      if (role === 'admin') {
        isAdmin = true;
      }
  
      this.userService.createUser(email, firstName, lastName, password, isAdmin).subscribe(
        (response: tableauUser) => {
          console.log('Utilisateur créé avec succès!', response);
          this.loadUsers();
          this.userForm.reset();
        },
        error => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
        }
      );
    }
  }
  deleteUserById(id: number) {
    // Logique pour supprimer un utilisateur avec l'email donné
    this.userService.deleteUserById(id).subscribe(
      response => {
        console.log('Utilisateur supprimé avec succès!', response);
        // Mettre à jour la source de données après la suppression
        this.loadUsers();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }
}