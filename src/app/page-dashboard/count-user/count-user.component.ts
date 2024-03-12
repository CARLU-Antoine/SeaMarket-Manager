import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
@Component({
  selector: 'app-count-user',
  standalone: true,
  imports: [
    MatCard,
  ],
  templateUrl: './count-user.component.html',
  styleUrl: './count-user.component.css'
})
export class CountUserComponent {
  @Input() userCount: number = 0;
}
