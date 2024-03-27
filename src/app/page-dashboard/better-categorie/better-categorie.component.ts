import { Component,Input,OnInit } from '@angular/core';

import { ManageProductService } from '../../services/manage-product.service';

import { ProductsListService } from '../../services/products-list.service';

@Component({
  selector: 'app-better-categorie',
  standalone: true,
  imports: [],
  templateUrl: './better-categorie.component.html',
  styleUrl: './better-categorie.component.css'
})


export class BetterCategorieComponent implements OnInit{

    @Input() bestCategory: string = '';
    @Input() bestProduct: string = ''; 
    @Input() numberBestProduct: number = 0; 
  
    constructor(private manageProductService:ManageProductService,private productsListService: ProductsListService) { }
  
    ngOnInit(): void {
      this.recoverBestCategory();
    }
  
    recoverBestCategory(): void {
      let bestCategoryName = '';
      let maxSell = 0;
  
      this.manageProductService.getListCategories().subscribe(
        (data: any) => {
          const categories: { id: number, nameCategory: string }[] = Object.values(data);
  
          this.productsListService.getProducts().subscribe(
            (products: any[]) => {
              for (const product of products) {
                if (product.categories && Array.isArray(product.categories) && product.categories.length > 0) {
                  for (const categoryId of product.categories) {
                    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
                    if (product.sellArticle > maxSell && categories[categoryIndex].nameCategory!='all') {
                      maxSell = product.sellArticle;
                      bestCategoryName = categories[categoryIndex].nameCategory;
                      this.bestProduct = product.name;
                    }
                  }
                }
              }
              this.bestCategory = bestCategoryName;
              this.numberBestProduct = maxSell;
            },
            (error: any) => {
              console.error('Erreur lors de la récupération des produits :', error);
            }
          );
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des catégories :', error);
        }
      );
    }    

  }