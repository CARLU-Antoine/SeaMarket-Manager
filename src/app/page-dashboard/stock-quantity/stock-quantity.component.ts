import { Component,OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProductsListService } from '../../services/products-list.service';
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
  public pieChartDatasets: { data: number[] }[] = [{ data: [25, 15, 10] }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private productsListService: ProductsListService) { }

  ngOnInit(): void {
    // Chargez le graphique lors de l'initialisation du composant
    this.loadChart();
  }

  loadChart(): void {
    this.productsListService.getProducts().subscribe((data: any[]) => {
      let categoryCounts = [0, 0, 0];
      for (const product of data) {
        console.log(product)
        const category = Array.isArray(product.categories) ? product.categories[0] : product.categories;
        switch (category) {
          case 1:
            categoryCounts[0]+= product.quantity; ;
            break;
          case 2:
            categoryCounts[1]+= product.quantity; ;
            break;
          case 3:
            categoryCounts[2]+= product.quantity; ;
            break;
          default:
            break;
        }
      }
      this.pieChartDatasets = [{ data: categoryCounts }];
    });
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