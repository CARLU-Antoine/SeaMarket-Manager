import { Component, Input,OnInit,ViewChild,OnChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsListService } from '../../services/products-list.service';
import { ManageProductService } from '../../services/manage-product.service';
import { MatSelectModule } from '@angular/material/select';


export interface tableauProduct {
  categories: any[];
  comments: string;
  id : number;
  percentSale: number;
  price: number;
  productId: number;
  quantity: number;
  sellArticle: number;
  name: string;
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
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './tableau-general.component.html',
  styleUrl: './tableau-general.component.css'
})

export class TableauGeneralComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['nom', 'prix', 'pourceProm', 'stock', 'vente', 'commentaire', 'edit'];
  dataSource: MatTableDataSource<tableauProduct>;
  productAvailable: any;

  @Input() categorie: string | undefined;
  @Input() modeEdition: boolean = false;
  forms: FormGroup[] = [];
  productExistsValidator(currentProductId:number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if(control && (this.productAvailable.filter((product:any) => control.value === product.id) || currentProductId === control.value)){
        return null;
      }
      return { productExists: false };
    }

  }
  productHigherSellArticle(currentValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value >= currentValue) {
          return null; // retourne null si la validation est réussie
      } else {
          return { lowerValue: true }; // retourne un objet d'erreur si la validation échoue
      }
  };
}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productsListService: ProductsListService, private manageProductService: ManageProductService,productListService:ProductsListService) {
    this.dataSource = new MatTableDataSource<tableauProduct>();
  }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.loadProducts();
    this.manageProductService.getListAvailableProduct().subscribe((response: any) => {
      console.log("AvailableProduct: "+response)
      this.productAvailable = response
    });
    this.productsListService.productData.subscribe((response) => {

     this.forms =response.map((product: any):FormGroup => {
        return this.createFormWithValidators(product)
      });
    });
  }

  ngOnChanges(): void {
    this.loadProducts();
  }
  createFormWithValidators(product:any): FormGroup {
    return new FormGroup({
      id : new FormControl(product.id, [Validators.required]),
      name: new FormControl(product.productId, [Validators.required, this.productExistsValidator(product.productId)]),
      price: new FormControl(product.price,[Validators.required, Validators.min(0)]),
      quantity: new FormControl(product.quantity,[Validators.required, Validators.min(0)]),
      percentSale: new FormControl(product.percentSale,[Validators.required, Validators.min(0), Validators.max(100)]),
      sellArticle: new FormControl(product.sellArticle,[Validators.required, Validators.min(0), this.productHigherSellArticle(product.sellArticle)]),
      comments: new FormControl(product.comments)
    });
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
        name: product.name
      }));

      this.dataSource.paginator = this.paginator;
    });
  }
  
  

  updateProduct(index:number): void {
    const element = this.forms[index].value;
    if(this.forms[index].valid){
      this.dataSource.data.forEach((item, index) => {
        if (item.id === element.id ) {
        const newElement = {
          id : Number(item.id),
          ...(element.comments !== item.comments && { comments: element.comments }),
          ...(element.percentSale !== item.percentSale && { percentSale: element.percentSale }),
          ...(element.price !== item.price && { price: element.price }),
          ...(element.productId !== item.productId && { productId: element.name }),
          ...(element.quantity !== item.quantity && { quantity: element.quantity }),
          ...(element.sellArticle !== item.sellArticle && { sellArticle: element.sellArticle }),
          ...(element.quantity > item.quantity && { reason: 'buy' }),
          ...(element.quantity < item.quantity && { reason: (element.price === 0 ? 'unsold' : 'sell') })
        }
        this.manageProductService.updateProduct(newElement).subscribe(
          response => {
            console.log('Produit mis à jour !',response);
            this.dataSource.data[index] = response;
          },
          error => {
            console.error('Erreur lors de la mise à jour du produit :', error);
          }
        );
        return;
        }
      });
    }
    else{
      console.error('Formulaire invalide');
    }

  }
}