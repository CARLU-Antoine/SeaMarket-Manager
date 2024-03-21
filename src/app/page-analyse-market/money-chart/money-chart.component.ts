import { Component,OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { StatsRevenuesService } from '../../services/stats-revenues.service';

interface RevenueData {
  date: string;
  value: number;
  quantity: number;
}

@Component({
  selector: 'app-money-chart',
  templateUrl: './money-chart.component.html',
  standalone: true,
  imports: [
    BaseChartDirective,
    FormsModule],
  styleUrls: ['./money-chart.component.css']
})
export class MoneyChartComponent implements OnInit {
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  constructor(private statsRevenuesService: StatsRevenuesService) { }

  ngOnInit(): void {
    // Appelez la méthode getChartDataRevenues avec les valeurs de catégorie et de type
    this.loadChart('year');
  }

  // Dans votre méthode loadChart, spécifiez le type de données attendu
  loadChart(type: string): void {
    // Appelez la méthode getChartDataRevenues avec les valeurs de catégorie et de type
    this.statsRevenuesService.getDataRevenues('all', type).subscribe(
      (data: any) => {
        // Parsez la chaîne JSON pour obtenir un tableau d'objets JavaScript
        const jsonData = JSON.parse(data);
  
        // Organisez les données reçues pour les utiliser dans le graphique
        this.lineChartLabels = jsonData.map((item: { date: string | number | Date; }) => new Date(item.date).toLocaleDateString());
        this.lineChartData = [{ data: jsonData.map((item: { value: any; }) => item.value), label: 'Chiffre d\'affaires' }];
      },
      (error) => {
        console.error(error); // Gérez les erreurs
      }
    );
  }

  downloadData(): void {
    // Créer un tableau de données contenant les étiquettes et les données
    const data = [this.lineChartLabels].concat(
      this.lineChartData.map(dataPoint => dataPoint.data)
    );
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chiffre d\'affaires');
    XLSX.writeFile(wb, 'Chiffre_d_affaires.xlsx');
  }
  
  getData(): any[] {
    // Récupérer les données sous forme d'un tableau d'objets avec les étiquettes et les valeurs
    return this.lineChartLabels.map((label, index) => ({
      label: label,
      value: this.lineChartData[0].data[index] // Supposons que vous avez un seul jeu de données pour simplifier
    }));
  }
}