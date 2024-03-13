import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CountUserComponent } from './count-user/count-user.component';
import { CountMoneyComponent } from './count-money/count-money.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';
import { SellsChartComponent } from './sells-chart/sells-chart.component';

import confetti from 'canvas-confetti';
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
    SellsChartComponent,
    
  ],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {
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
}
