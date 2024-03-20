import { Component,ViewChild,TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog,MatDialogContent,MatDialogActions } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ManageProductService } from '../services/manage-product.service';

import {
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

import { TableauGeneralComponent } from './tableau-general/tableau-general.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

export interface tableauCategorie {
  nom: string;
}

export interface productElement {
  categorie: number;
  name:string,
  price: string;
  quantity:number;
  comment: string;
}


// mettre l'appel à la vraie bdd des poissons
const ELEMENT_DATA: tableauCategorie[] = [
  { nom: 'Poissons'},
  { nom: 'Fruits de mer'},
  { nom: 'Crustacés'},
];
@Component({
  selector: 'app-page-tableau-produits',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatTabsModule,
    TableauGeneralComponent,
    SidenavComponent,
    MatSlideToggleModule,
    FormsModule,
    _MatSlideToggleRequiredValidatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './page-tableau-produits.component.html',
  styleUrl: './page-tableau-produits.component.css'
})

export class PageTableauProduitsComponent {
  userForm: FormGroup;
  isChecked: boolean = false;
  modeEdition: boolean = false;

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(public dialog: MatDialog,private fb: FormBuilder, private manageProductService: ManageProductService) {
    this.userForm = this.fb.group({
      categorie: ['', [Validators.required]],
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.dialogContent, {

    });
  }
  
  closeDialog(): void {
    this.dialog.closeAll();
  }
  modifierModeEdition(): void {
    this.modeEdition = this.isChecked;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const categorie = this.userForm.get('categorie')!.value;
      const name = this.userForm.get('name')!.value;
      const quantity = this.userForm.get('quantity')!.value;
      const price = this.userForm.get('price')!.value;
      const commment = this.userForm.get('comment')!.value;

      this.manageProductService.addProduct(categorie,name,quantity,price,commment).subscribe(
        (response: productElement) => {
          console.log('Produit ajouté avec succès!', response);
          // Réinitialiser le formulaire après soumission
          this.userForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'ajout du produit', error);
        }
      );
    }
  }
  displayedColumns: string[] = ['nom'];
  dataSource = ELEMENT_DATA;
}
