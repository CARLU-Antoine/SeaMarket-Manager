import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


export interface tableauProduits {
  categorie: string;
  nom: string;
  prix: number;
  pourceProm: number;
  stock: number;
  vente: number;
  commentaire: string;
}

const ELEMENT_DATA: tableauProduits[] = [
  { categorie:"Poissons", nom: 'Cabillaut', prix: 10, pourceProm: 0, stock: 540, vente: 140, commentaire: ''},
  { categorie:"Poissons", nom: 'Bar', prix: 4, pourceProm: 5, stock: 85, vente: 250, commentaire: ''},
  { categorie:"Poissons", nom: 'Poisson chat', prix: 15, pourceProm: 20, stock: 2, vente: 440, commentaire: ''},

  { categorie:"Fruits de mer", nom: 'crevette', prix: 10, pourceProm: 0, stock: 540, vente: 140, commentaire: ''},
  { categorie:"Fruits de mer", nom: 'berlingot', prix: 4, pourceProm: 5, stock: 85, vente: 250, commentaire: ''},
  { categorie:"Fruits de mer", nom: 'fdm', prix: 15, pourceProm: 20, stock: 2, vente: 440, commentaire: ''},

  { categorie:"Crustacés", nom: 'homard', prix: 10, pourceProm: 0, stock: 540, vente: 140, commentaire: ''},
  { categorie:"Crustacés", nom: 'jsp', prix: 4, pourceProm: 5, stock: 85, vente: 250, commentaire: ''},
  { categorie:"Crustacés", nom: 'Crabe', prix: 15, pourceProm: 20, stock: 2, vente: 440, commentaire: ''},
];

@Component({
  selector: 'app-tableau-general',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    TableauGeneralComponent
  ],
  templateUrl: './tableau-general.component.html',
  styleUrl: './tableau-general.component.css'
})

export class TableauGeneralComponent {
  displayedColumns: string[] = ['nom', 'prix', 'pourceProm', 'stock', 'vente', 'commentaire', 'edit'];
  dataSource: tableauProduits[];

  @Input() categorie: string | undefined;
  @Input() modeEdition: boolean=false;

  constructor() {
    this.dataSource = ELEMENT_DATA;
  }

  ngOnChanges(): void {
    if (this.categorie) {
      this.dataSource = ELEMENT_DATA.filter(item => item.categorie === this.categorie);
    } else {
      this.dataSource = ELEMENT_DATA;
    }

  }

  editRow(element: tableauProduits): void {
    // Mettez en œuvre la logique pour éditer la ligne ici
    console.log("Edit row:", element);
  }
}