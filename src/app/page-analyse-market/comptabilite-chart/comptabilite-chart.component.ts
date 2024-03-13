import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import * as XLSX from 'xlsx';

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
  public lineChartType: ChartType = "line";

  constructor() { }


  downloadData(): void {
    // Créer un tableau de données contenant les étiquettes et les données
    const data = [this.lineChartData].concat(
        this.lineChartData.map(dataPoint => dataPoint.data)
    );

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Résultat comptable');
    XLSX.writeFile(wb, 'Résultat comptable.xlsx');
  }
}
