import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-comptabilite-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './comptabilite-chart.component.html',
  styleUrl: './comptabilite-chart.component.css'
})
export class ComptabiliteChartComponent {
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: '  Frais' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() { }

  ngOnInit() {
  }
}
