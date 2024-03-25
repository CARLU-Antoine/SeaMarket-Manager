import { Component,ViewChildren, QueryList } from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MoneyChartComponent } from './money-chart/money-chart.component';
import { ComptabiliteChartComponent } from './comptabilite-chart/comptabilite-chart.component';
import { ProductStatsChartComponent } from './product-stats-chart/product-stats-chart.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-page-analyse-market',
  standalone: true,
  imports: [
    SidenavComponent,
    MatCard,
    MatGridListModule,
    MatIconModule,
    MoneyChartComponent,
    ComptabiliteChartComponent,
    ProductStatsChartComponent
  ],
  templateUrl: './page-analyse-market.component.html',
  styleUrls: ['./page-analyse-market.component.css']
})

export class PageAnalyseMarketComponent {
  @ViewChildren(MoneyChartComponent) moneyCharts!: QueryList<MoneyChartComponent>;
  @ViewChildren(ComptabiliteChartComponent) comptabiliteCharts!: QueryList<ComptabiliteChartComponent>;
  @ViewChildren(ProductStatsChartComponent) productStatsChart!: QueryList<ProductStatsChartComponent>;

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

  downloadAllChartData(): void {
    const workbook = XLSX.utils.book_new();
  
    // Télécharger les données de chaque graphique dans une feuille Excel distincte
    this.moneyCharts.forEach((chart, index) => {
      const data = chart.getData();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Chiffre d\'affaire`);
    });
  
    this.comptabiliteCharts.forEach((chart, index) => {
      const data = chart.getData();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Rendu comptable`);
    });
  
    this.productStatsChart.forEach((chart, index) => {
      const data = chart.getData();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Analyse des produits`);
    });
  
    // Écrire le fichier Excel
    XLSX.writeFile(workbook, 'Résultats.xlsx');
  }
  
  loadAllChatData(): void{
    this.LoadChartData(this.moneyCharts);
    this.LoadChartData(this.comptabiliteCharts);
    this.LoadChartData(this.productStatsChart);
  }
  
  loadMoneyChartData(): void{
    this.LoadChartData(this.moneyCharts);
  }

  loadComptabiliteChartData(): void{
    this.LoadChartData(this.comptabiliteCharts);
  }

  
  loadProductStatChartData(): void{
    this.LoadChartData(this.productStatsChart);
  }

  downloadMoneyChartData(): void {
    this.DownloadChartData(this.moneyCharts);
  }

  downloadComptabiliteChartData(): void {
    this.DownloadChartData(this.comptabiliteCharts);
  }

  downloadProductChartData(): void {
    this.DownloadChartData(this.productStatsChart);
  }

}