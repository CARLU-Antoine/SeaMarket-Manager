import { Component } from '@angular/core';
// import { NgChartsModule } from 'ng2-charts';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-page-dashboard',
  standalone: true,
  imports: [
    SidenavComponent,
    PieChartComponent
    // NgChartsModule
  ],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {

}
