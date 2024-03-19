import { Component,OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ManageHistoryService } from '../../services/manage-history.service';
@Component({
  selector: 'app-sells-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './sells-chart.component.html',
  styleUrl: './sells-chart.component.css'
})
export class SellsChartComponent implements OnInit {
  barChartData: any[] = []; // Initialisez la propriété barChartData
  barChartOptions:any;
  barChartLabels: string[] = []; // Initialisez la propriété barChartLabels
  barChartType: string = ''; // Initialisez la propriété barChartType
  barChartLegend:boolean = true;

  constructor(private chartService: ManageHistoryService) { }

  ngOnInit(): void {
    this.loadChart()
  }

  loadChart(): void{
    this.chartService.getChartData().subscribe(data => {
      this.barChartData = [
        { data: data.map(item => item.quantityHistory), label: 'Quantité vendue' },
        // Vous pouvez ajouter d'autres séries de données selon vos besoins
      ];
      console.log(data);
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
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}