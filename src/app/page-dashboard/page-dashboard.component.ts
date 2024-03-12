import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CountUserComponent } from './count-user/count-user.component';
import { CountMoneyComponent } from './count-money/count-money.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
@Component({
  selector: 'app-page-dashboard',
  standalone: true,
  imports: [
    SidenavComponent,
    PieChartComponent,
    CountUserComponent,
    MatCard,
    MatGridListModule,
    CountMoneyComponent,
  ],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {
  numberOfUsers = 5; //recuperer nombre de user ici 
  numberOfMoney = 12345; //recuperer nombre de revenue ici 
}
