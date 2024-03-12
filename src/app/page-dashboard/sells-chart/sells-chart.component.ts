import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-sells-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './sells-chart.component.html',
  styleUrl: './sells-chart.component.css'
})
export class SellsChartComponent {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [//récuperer data des ventes
    {data: [65, 59, 80, 81, 56, 55, 40, 48, 40, 81, 56, 49], label: 'Poissons'},
    {data: [12, 48, 75, 74, 12, 24, 65, 59, 80, 81, 19, 86], label: 'Fruits de mer'},
    {data: [28, 48, 40, 19, 86, 27, 90, 24, 65, 56, 55, 40], label: 'Coquillages'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
