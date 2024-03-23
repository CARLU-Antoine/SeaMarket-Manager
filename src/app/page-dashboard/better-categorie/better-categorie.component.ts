import { Component,Input,OnInit } from '@angular/core';
import { ProductsListService } from '../../services/products-list.service';

@Component({
  selector: 'app-better-categorie',
  standalone: true,
  imports: [],
  templateUrl: './better-categorie.component.html',
  styleUrl: './better-categorie.component.css'
})


export class BetterCategorieComponent implements OnInit{
    @Input() bestCategorie: string = '';
    @Input() bestProduct: number = 0; 
    @Input() numberBestProduct: number = 0; 
  
    public categories = ['Poissons', 'Fruits de mer', 'Coquillages'];
  
    constructor(private productsListService: ProductsListService) { }
  
    ngOnInit(): void {
      this.recoverBestCategorie();
    }
  
    recoverBestCategorie(): void {
      this.productsListService.getProducts().subscribe((data: any[]) => {
        let categoryCounts = [0, 0, 0];
        let categoryBestProducts =0; // Pour stocker l'ID du produit avec le plus de ventes pour chaque catégorie
        
        for (const product of data) {
          const category = Array.isArray(product.categories) ? product.categories[0] : product.categories;
          
          switch (category) {
            case 1:
              categoryCounts[0] += product.sellArticle;

              if (product.sellArticle >= Math.max(...categoryCounts)) {
                categoryBestProducts = product.id;
                console.log('meilleur produit',product.id);
              }
              break;
            case 2:
              categoryCounts[1] += product.sellArticle;

              if (product.sellArticle >= Math.max(...categoryCounts)) {
                categoryBestProducts = product.id;
              }
              break;
            case 3:
              categoryCounts[2] += product.sellArticle;

              if (product.sellArticle >= Math.max(...categoryCounts)) {
                categoryBestProducts = product.id;
              }
              break;
            default:
              break;
          }
        }
        
        // Trouver la catégorie avec le nombre le plus élevé
        const maxCount = Math.max(...categoryCounts);
        const bestCategoryIndex = categoryCounts.indexOf(maxCount);
        this.bestCategorie = this.categories[bestCategoryIndex];
        this.bestProduct = categoryBestProducts;
        this.numberBestProduct = maxCount;
      });
    }
    
  }