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
  barChartData: any[] = []; // Initialisez la propriété barChartData
  barChartOptions: any;
  barChartLabels: string[] = []; // Initialisez la propriété barChartLabels
  barChartType: string = ''; // Initialisez la propriété barChartType
  barChartLegend: boolean = true;

  constructor(private chartService: ManageHistoryService) { }

  ngOnInit(): void {
    this.loadChart('year'); // Chargez initialement les données pour l'année
  }

  loadChart(typeSelected: string = 'year'): void {
    this.chartService.getChartData().subscribe(data => {
      // Initialiser filteredData à un tableau vide par défaut
      let filteredData = [];
      let filteredLabels: string[] = [];
      if (typeSelected === 'day') {
        filteredData = data.filter(item => new Date(item.addDate).getDate() === new Date().getDate());
        filteredLabels = ['Jour'];
      } else if (typeSelected === 'month') {
        filteredData = data.filter(item => new Date(item.addDate).getMonth() === new Date().getMonth());
        filteredLabels = ['Mois'];
      } else if (typeSelected === 'year') {
        filteredData = data.filter(item => new Date(item.addDate).getFullYear() === new Date().getFullYear());
        filteredLabels = ['Année'];
      }

      this.barChartData = [
        { data: filteredData.map(item => item.quantityHistory), label: 'Quantité vendue' },
        // Vous pouvez ajouter d'autres séries de données selon vos besoins
      ];

      this.barChartLabels = filteredLabels;

      // Modifier la légende en fonction du type de date
      this.barChartLegend = filteredData.length > 0; // Afficher la légende uniquement si des données sont disponibles

      // Initialisez les options du graphique ici pour garantir que les données sont correctement filtrées avant l'initialisation des options
      this.initializeChartOptions();
    });
}
  initializeChartOptions(): void {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
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
    XLSX.utils.book_append_sheet(wb, ws, 'Analyse des produits');
    XLSX.writeFile(wb, 'Analyse des produits.xlsx');
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}