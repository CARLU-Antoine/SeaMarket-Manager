import { Component, Input,OnInit,OnChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsListService } from '../../services/products-list.service';
import { ManageProductService } from '../../services/manage-product.service';


export interface tableauProduct {
  categorie: string;
  nom: string;
  price: number;
  percentSale: number;
  quantity: number;
  sellArticle: number;
  commentaire: string;
}

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
  ],
  templateUrl: './tableau-general.component.html',
  styleUrl: './tableau-general.component.css'
})

export class TableauGeneralComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['nom', 'prix', 'pourceProm', 'stock', 'vente', 'commentaire', 'edit'];
  dataSource: MatTableDataSource<tableauProduct>;

  @Input() categorie: string | undefined;
  @Input() modeEdition: boolean = false;

  constructor(private productsListService: ProductsListService, private manageProductService: ManageProductService) {
    this.dataSource = new MatTableDataSource<tableauProduct>();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsListService.getProducts().subscribe((data: any[]) => {
      this.dataSource.data = data.map(product => ({
        categorie: product.categories.join(','),
        nom: product.id.toString(),
        percentSale: parseFloat(product.percentSale),
        price: product.price,
        quantity: parseInt(product.quantity),
        sellArticle: parseInt(product.sellArticle),
        commentaire: product.comments
      }));
    });
  }

  updateProduct(element: tableauProduct): void {
    this.manageProductService.updateProduct(element).subscribe(
      response => {
        console.log('Produit mis à jour avec succès !');
        // Faites quelque chose avec la réponse, si nécessaire
      },
      error => {
        console.error('Erreur lors de la mise à jour du produit :', error);
      }
    );
  }
}