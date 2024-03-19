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
  public barChartLabels:string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [];

  constructor(private manageHistoryService: ManageHistoryService) { }

  ngOnInit(): void {
    this.loadChart()
  }
  
  loadChart(): void{
    this.manageHistoryService.getChartData().subscribe(data => {
      this.barChartData = [
        { data: data.map(item => item.quantityHistory), label: 'Quantité vendue' },
        // Vous pouvez ajouter d'autres séries de données selon vos besoins
      ];
      console.log("je suis la ", data);
      // Mettez à jour d'autres variables de graphique si nécessaire
    });
    this.initializeChartOptions();
  }

  initializeChartOptions(): void {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    this.barChartLabels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    this.barChartType = 'bar'; // Initialisez la propriété barChartType
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
    XLSX.utils.book_append_sheet(wb, ws, 'impôts');
    XLSX.writeFile(wb, 'impôts.xlsx');
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
}
