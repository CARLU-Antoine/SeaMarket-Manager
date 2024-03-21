import { Component,ViewChildren,QueryList } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CountUserComponent } from './count-user/count-user.component';
import { CountMoneyComponent } from './count-money/count-money.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StockQuantityComponent } from './stock-quantity/stock-quantity.component';
import { BetterCategorieComponent } from './better-categorie/better-categorie.component';
import { SellsChartComponent } from './sells-chart/sells-chart.component';
import { CountTaxComponent } from './count-tax/count-tax.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import confetti from 'canvas-confetti';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-page-dashboard',
  standalone: true,
  imports: [
    SidenavComponent,
    PieChartComponent,
    MatCard,
    MatGridListModule,
    CountMoneyComponent,
    CountUserComponent,
    CountTaxComponent,
    BetterCategorieComponent,
    StockQuantityComponent,
    SellsChartComponent,
    MatIconModule
  ],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {
  @ViewChildren(StockQuantityComponent) stockChart!: QueryList<StockQuantityComponent>;
  @ViewChildren(PieChartComponent) ventesChart!: QueryList<PieChartComponent>;
  @ViewChildren(SellsChartComponent) historiqueChart!: QueryList<SellsChartComponent>;

  constructor() { }

  private DownloadChartData(charts: QueryList<any>): void {
    charts.forEach(chart => {
      chart.downloadData();
    });
  }

  private LoadChartData(charts: QueryList<any>): void {
    charts.forEach(chart => {
      chart.loadChart();
    });
  }
  numberOfUsers = 5; //recuperer nombre de user ici 
  numberOfMoney = 12345; //recuperer nombre de revenue ici 

  celebrate() {
  const duration = 3000;

  confetti({
    particleCount: 150,
    spread: 180,
    origin: { y: 0.6 },
    colors: ['#FF4500', '#008080', '#FFD700'],
  });

  setTimeout(() => confetti.reset(), duration);
}

downloadAllChartData(): void {
  const workbook = XLSX.utils.book_new();
  // Télécharger les données de chaque graphique dans une feuille Excel distincte
  this.stockChart.forEach((chart, index) => {
    const data = chart.getData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Analyse du stock`);
  });

  this.ventesChart.forEach((chart, index) => {
    const data = chart.getData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Analyse des entes`);
  });

  this.historiqueChart.forEach((chart, index) => {
    const data = chart.getData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Analyse des produits`);
  });

  // Écrire le fichier Excel
  XLSX.writeFile(workbook, 'Résultats.xlsx');
}

loadAllChatData(): void{
  this.LoadChartData(this.stockChart);
  this.LoadChartData(this.ventesChart);
  this.LoadChartData(this.historiqueChart);
}

loadStockChartData(): void{
  this.LoadChartData(this.stockChart);
}
loadVentesChartData(): void{
  this.LoadChartData(this.ventesChart);
}
loadHistoriqueChartData():void{
  this.LoadChartData(this.historiqueChart);
}

downloadStockChartData(): void {
  this.DownloadChartData(this.stockChart);
}

downloadVentesChartData(): void {
  this.DownloadChartData(this.ventesChart);
}

downloadHistoriqueChartData(): void {
  this.DownloadChartData(this.historiqueChart);
}

}
