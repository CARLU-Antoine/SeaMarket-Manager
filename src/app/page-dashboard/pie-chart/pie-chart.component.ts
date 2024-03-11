import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  title = 'ng2-charts-demo';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  // ICI POUR METTRE LES DONNEES DU NOMBRE DE POISSONS/...
  public pieChartLabels = [ 'Poissons','Fruits de mer', 'Coquillages' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

}
