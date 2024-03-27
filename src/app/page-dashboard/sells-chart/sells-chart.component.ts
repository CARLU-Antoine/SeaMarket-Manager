import { Component,OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ManageHistoryService } from '../../services/manage-history.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sells-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './sells-chart.component.html',
  styleUrl: './sells-chart.component.css'
})
export class SellsChartComponent implements OnInit {
  barChartData: any[] = [];
  barChartOptions: any;
  barChartLabels: string[] = [];
  barChartType: string = '';
  barChartLegend: boolean = true;
  selectedTypeDate: string=''; 

  constructor(private chartService: ManageHistoryService) { }

  ngOnInit(): void {
    this.loadChart('year');
  }

  loadChart(selectedTypeDate: string = 'year'): void {
    this.chartService.getChartData().subscribe(data => {
      let filteredData = [];
      let filteredLabels: string[] = [];
      if (selectedTypeDate === 'day') {
        filteredData = data.filter(item => new Date(item.addDate).getDate() === new Date().getDate());
        filteredLabels = ['Jour'];
      } else if (selectedTypeDate === 'month') {
        filteredData = data.filter(item => new Date(item.addDate).getMonth() === new Date().getMonth());
        filteredLabels = ['Mois'];
      } else if (selectedTypeDate === 'year') {
        filteredData = data.filter(item => new Date(item.addDate).getFullYear() === new Date().getFullYear());
        filteredLabels = ['Année'];
      }

      this.barChartData = [
        { data: filteredData.map(item => item.quantityHistory), label: 'Quantité vendue' },
      ];

      this.barChartLabels = filteredLabels;

      this.barChartLegend = filteredData.length > 0;

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
    return this.barChartLabels.map((label, index) => ({
      label: label,
      data: this.barChartData.map(dataPoint => dataPoint.data[index]),
      type: this.barChartData.map(dataPoint => dataPoint.type)
    }));
  }

  downloadData(): void {
    const data = [this.barChartLabels].concat(
      this.barChartData.map(dataPoint => dataPoint.data)
    );

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Analyse des produits');
    XLSX.writeFile(wb, 'Analyse des produits.xlsx');
  }
}