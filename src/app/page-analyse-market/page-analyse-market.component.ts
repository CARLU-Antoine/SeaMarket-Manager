import { Component,ViewChildren, QueryList } from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MoneyChartComponent } from './money-chart/money-chart.component';
import { ComptabiliteChartComponent } from './comptabilite-chart/comptabilite-chart.component';
import { ImpotChartComponent } from './impot-chart/impot-chart.component'; 
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
    ImpotChartComponent
  ],
  templateUrl: './page-analyse-market.component.html',
  styleUrls: ['./page-analyse-market.component.css']
})

export class PageAnalyseMarketComponent {
  @ViewChildren(MoneyChartComponent) moneyCharts!: QueryList<MoneyChartComponent>;
  @ViewChildren(ComptabiliteChartComponent) comptabiliteCharts!: QueryList<ComptabiliteChartComponent>;
  @ViewChildren(ImpotChartComponent) impotCharts!: QueryList<ImpotChartComponent>;

  constructor() { }

  private DownloadChartData(charts: QueryList<any>): void {
    charts.forEach(chart => {
      chart.downloadData();
    });
  }

  private getAllChartData(): any[] {
    const allData: any[] = [];
    this.moneyCharts.forEach(chart => allData.push(...chart.getData()));
    this.comptabiliteCharts.forEach(chart => allData.push(...chart.getData()));
    this.impotCharts.forEach(chart => allData.push(...chart.getData()));
    return allData;
  }
  
  downloadAllChartData(): void {
    const allData = this.getAllChartData();
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Résultat');
    XLSX.writeFile(workbook, 'Résultat.xlsx');
  }

  downloadMoneyChartData(): void {
    this.DownloadChartData(this.moneyCharts);
  }

  downloadComptabiliteChartData(): void {
    this.DownloadChartData(this.comptabiliteCharts);
  }

  downloadImpotChartData(): void {
    this.DownloadChartData(this.impotCharts);
  }

}