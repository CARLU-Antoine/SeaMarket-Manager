import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-money-chart',
  templateUrl: './money-chart.component.html',
  standalone: true,
  imports: [BaseChartDirective],
  styleUrls: ['./money-chart.component.css']
})
export class MoneyChartComponent {
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Chiffre affaire' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() { }
  

  downloadData(): void {
    // Créer un tableau de données contenant les étiquettes et les données
    const data = [this.lineChartData].concat(
        this.lineChartData.map(dataPoint => dataPoint.data)
    );

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chiffre d\'affaire');
    XLSX.writeFile(wb, 'Chiffre d\'affaire.xlsx');
  }
}
