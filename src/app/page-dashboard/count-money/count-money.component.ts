import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-count-money',
  standalone: true,
  imports: [
    MatCard,
  ],
  templateUrl: './count-money.component.html',
  styleUrl: './count-money.component.css'
})
export class CountMoneyComponent {
  @Input() moneyCount: number = 0;
}
