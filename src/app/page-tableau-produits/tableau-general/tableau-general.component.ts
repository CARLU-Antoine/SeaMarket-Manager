import { Component, Input,OnInit,ViewChild,OnChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsListService } from '../../services/products-list.service';
import { ManageProductService } from '../../services/manage-product.service';


export interface tableauProduct {
  categories: any[];
  comments: string;
  id : number;
  percentSale: number;
  price: number;
  productId: number;
  quantity: number;
  sellArticle: number;
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
    MatPaginatorModule
  ],
  templateUrl: './tableau-general.component.html',
  styleUrl: './tableau-general.component.css'
})

export class TableauGeneralComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['nom', 'prix', 'pourceProm', 'stock', 'vente', 'commentaire', 'edit'];
  dataSource: MatTableDataSource<tableauProduct>;

  @Input() categorie: string | undefined;
  @Input() modeEdition: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        categories: product.categories,
        comments: product.comments,
        id: product.id,
        percentSale: parseFloat(product.percentSale),
        price: product.price,
        productId: product.productId,       
        quantity: parseInt(product.quantity),
        sellArticle: parseInt(product.sellArticle),
      }));
      this.dataSource.paginator = this.paginator;
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