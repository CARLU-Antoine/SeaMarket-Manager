import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

import { TableauGeneralComponent } from './tableau-general/tableau-general.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

export interface tableauCategorie {
  nom: string;
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
    ReactiveFormsModule
  ],
  templateUrl: './page-tableau-produits.component.html',
  styleUrl: './page-tableau-produits.component.css'
})

export class PageTableauProduitsComponent {
  isChecked: boolean = false;
  modeEdition: boolean = false;
  
  modifierModeEdition(): void {
    this.modeEdition = this.isChecked;
  }

  displayedColumns: string[] = ['nom'];
  dataSource = ELEMENT_DATA;
}