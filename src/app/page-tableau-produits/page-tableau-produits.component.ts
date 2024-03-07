import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

import { TableauGeneralComponent } from './tableau-general/tableau-general.component';

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
    TableauGeneralComponent
  ],
  templateUrl: './page-tableau-produits.component.html',
  styleUrl: './page-tableau-produits.component.css'
})

export class PageTableauProduitsComponent {
  displayedColumns: string[] = ['nom'];
  dataSource = ELEMENT_DATA;
}