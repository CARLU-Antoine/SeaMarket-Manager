import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MoneyChartComponent } from './money-chart/money-chart.component';
import { ComptabiliteChartComponent } from './comptabilite-chart/comptabilite-chart.component';
import { ImpotChartComponent } from './impot-chart/impot-chart.component'; 


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
  constructor() { }

}
