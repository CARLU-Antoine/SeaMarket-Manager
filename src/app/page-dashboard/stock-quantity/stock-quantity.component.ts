import { Component,OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProductsListService } from '../../services/products-list.service';
import { ManageProductService } from '../../services/manage-product.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-stock-quantity',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './stock-quantity.component.html',
  styleUrl: './stock-quantity.component.css'
})

export class StockQuantityComponent implements OnInit {
  title = 'ng2-charts-demo';
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Poissons', 'Fruits de mer', 'Coquillages'];
  public pieChartDatasets: { data: number[] }[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private manageProductService:ManageProductService,private productsListService: ProductsListService) { }

  ngOnInit(): void {
    // Chargez le graphique lors de l'initialisation du composant
    this.loadChart();
  }

  loadChart(): void {
    this.manageProductService.getListCategories().subscribe(
      (data: any) => {
        // Traitement des données ici
        const categories: { id: number, nameCategory: string }[] = Object.values(data) as { id: number, nameCategory: string }[];

        const pieChartLabels = categories.map(category => category.nameCategory);
        this.pieChartLabels = pieChartLabels;
  
        // Récupérer les produits
        this.productsListService.getProducts().subscribe(
          (products: any[]) => {
  
            let categoryCounts = Array(categories.length).fill(0); // Initialiser un tableau avec le nombre de catégories et les valeurs à 0

            // Parcourir les produits
            for (const product of products) {
              // Vérifier si le produit a des catégories
              if (product.categories && Array.isArray(product.categories) && product.categories.length > 0) {
                // Parcourir les catégories du produit
                for (const productCategory of product.categories) {
                  // Trouver la catégorie correspondante dans la liste des catégories
                  const categoryIndex = categories.findIndex(cat => cat.id === productCategory);
                  if (categoryIndex >= 0) {
                    // Incrémenter le compteur de la catégorie correspondante
                    categoryCounts[categoryIndex] += product.quantity;
                  }                  
                }
                
              }
            }
            // Mise à jour du graphique avec les données de catégorie filtrées
            this.pieChartDatasets = [{ data: categoryCounts }];
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
  downloadData(): void {
    // Créer un tableau de données contenant les étiquettes et les données
    const data = [this.pieChartLabels].concat(
      this.pieChartDatasets.map(dataPoint => dataPoint.data.map(String)) // Convertir les nombres en chaînes de caractères
    );
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stock');
    XLSX.writeFile(wb, 'Stock.xlsx');
}
    
  getData(): any[] {
      // Récupérer les données sous forme d'un tableau d'objets avec les étiquettes et les valeurs
      return this.pieChartLabels.map((label, index) => ({
          label: label,
          value: this.pieChartDatasets[0].data[index] // Supposons que vous avez un seul jeu de données pour simplifier
      }));
  }
}
