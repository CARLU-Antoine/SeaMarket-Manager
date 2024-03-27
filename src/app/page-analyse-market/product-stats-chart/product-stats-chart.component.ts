import { Component,OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ManageHistoryService } from '../../services/manage-history.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-impot-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './product-stats-chart.component.html',
  styleUrl: './product-stats-chart.component.css'
})
export class ProductStatsChartComponent implements OnInit{
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [];

  constructor(private manageHistoryService: ManageHistoryService) { }

  ngOnInit(): void {
    this.loadChart()
  }
  
  loadChart(): void {
    this.manageHistoryService.getChartData().subscribe(data => {
      const typeHistoryLabels = Array.from(new Set(data.map(item => item.typeHistory))); // Obtenir tous les types uniques
  
      // Initialiser le tableau de données du graphique avec des valeurs nulles
      const chartData = typeHistoryLabels.map(label => {
        const dataForLabel = data.filter(item => item.typeHistory === label);
        const totalQuantity = dataForLabel.map(item => item.quantityHistory)
                                          .reduce((acc, val) => acc + val, 0); // Calculer la somme totale des quantités vendues
        return { data: [totalQuantity], label: label };
      });
  
      this.barChartData = chartData;
      this.barChartLabels = typeHistoryLabels;
      this.initializeChartOptions();
    });
}
  
  initializeChartOptions(): void {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    this.barChartType = 'bar';
    this.barChartLegend = true;
  }
  

  getData(): any[] {
    // Récupérer les données sous forme d'un tableau d'objets avec les étiquettes et les valeurs
    return this.barChartLabels.map((label, index) => ({
      label: label,
      data: this.barChartData.map(dataPoint => dataPoint.data[index]),
      type: this.barChartData.map(dataPoint => dataPoint.type) // Ajouter les types d'historique
    }));
  }
  
  downloadData(): void {
    // Créer un tableau de données contenant les étiquettes et les données
    const data = [this.barChartLabels].concat(
        this.barChartData.map(dataPoint => dataPoint.data)
    );

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Analyse des produits');
    XLSX.writeFile(wb, 'Analyse des produits.xlsx');
  }
}
