import { Component,ViewChild,TemplateRef, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog,MatDialogContent,MatDialogActions } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ManageProductService } from '../services/manage-product.service';

import {
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

import { TableauGeneralComponent } from './tableau-general/tableau-general.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { error } from 'console';

export interface tableauCategorie {
  id: number;
  nameCategory: string;
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
  { nameCategory    : 'Poissons',id:1},
  { nameCategory: 'Fruits de mer',id:2},
  { nameCategory : 'Crustacés', id:3},
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
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './page-tableau-produits.component.html',
  styleUrl: './page-tableau-produits.component.css'
})

export class PageTableauProduitsComponent implements OnInit {
  userForm: FormGroup;
  isChecked: boolean = false;
  categories: tableauCategorie[] = ELEMENT_DATA;
  modeEdition: boolean = false;
  dataSource = ELEMENT_DATA;
  productAvailable:any[] = [];

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;
  constructor(public dialog: MatDialog,private fb: FormBuilder, private manageProductService: ManageProductService) {
    this.userForm = this.fb.group({
      categorie: ['', []],
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comment: ['']
    });
  }
  isNewCategory = false;

  ngOnInit(): void {
    this.manageProductService.getListCategories().subscribe((response: any) => {
      response.forEach((category: tableauCategorie) => {
        category.nameCategory = category.nameCategory.charAt(0).toUpperCase() + category.nameCategory.slice(1);
      });
      this.categories = response.filter((category: tableauCategorie) => category.nameCategory !== 'All');
      this.dataSource = response;
      

    });
    this.manageProductService.getListAvailableProduct().subscribe((response: any) => {
      this.productAvailable = response;
    });
  }
  onTabChange(event: MatTabChangeEvent): void {
    let selectedCategory = this.categories[event.index].id;
  }
  onCategoryChange(event: MatSelectChange): void {
    if( event.value.includes('new')){
      this.isNewCategory = true;
      const index = event.value.indexOf('new');

      if(index > -1){
        event.value.splice(index,1);
      }
      this.userForm.get('categorie')!.setValue(event.value);
      this.userForm.markAsPristine();

    }
  }

  addNewCategory(newCategory: string): void {
    
    this.manageProductService.addNewCategory(newCategory).subscribe((response: any) => {
      this.categories.push({ nameCategory: newCategory, id: response.id });
      this.userForm.get('categorie')!.setValue([response.id]);
      this.isNewCategory = false;
      this.userForm.markAsDirty();
    },
    (error: any) => {
      console.error('Erreur lors de l\'ajout de la catégorie', error);
      this.userForm.markAsDirty();

    }
    );
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
      const productId = this.userForm.get('name')!.value;
      const quantity = this.userForm.get('quantity')!.value;
      const price = this.userForm.get('price')!.value;
      const commment = this.userForm.get('comment')!.value;

      this.manageProductService.addProduct(categorie,productId,quantity,price,commment).subscribe(
        (response: any) => {
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
}
