import { Component,OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import * as XLSX from 'xlsx';
import { ManageHistoryService } from '../../services/manage-history.service';

@Component({
  selector: 'app-money-chart',
  templateUrl: './money-chart.component.html',
  standalone: true,
  imports: [BaseChartDirective],
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

  constructor(private manageHistoryService: ManageHistoryService) { }

  ngOnInit(): void {
    this.manageHistoryService.getChartData().subscribe((data: any[]) => {
      console.log('Données récupérées depuis data :', data);

      // Trier les données en fonction des mois de addDate
      data.sort((a, b) => {
        const dateA = new Date(a.addDate);
        const dateB = new Date(b.addDate);
        return dateA.getTime() - dateB.getTime();
      });

      // Créer un objet pour stocker les ventes par mois
      const ventesParMois: { [key: string]: number } = {};

      // Regrouper les transactions par mois et calculer la somme des ventes pour chaque mois
      data.forEach(item => {
        const mois = new Date(item.addDate).toLocaleString('fr-FR', { month: 'long', year: 'numeric' }); // Récupérer le mois et l'année sous forme de chaîne
        ventesParMois[mois] = (ventesParMois[mois] || 0) + parseFloat(item.valueHistory);
      });

      // Convertir les données en format utilisable pour le graphique
      const mois = Object.keys(ventesParMois);
      const chiffreAffairesParMois = Object.values(ventesParMois);

      // Utiliser les données pour afficher le graphique
      this.lineChartData = [
        { data: chiffreAffairesParMois, label: 'Chiffre d\'affaires par mois' }
      ];

      this.lineChartLabels = mois;
    });
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