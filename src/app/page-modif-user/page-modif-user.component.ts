import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-modif-user',
  standalone: true,
  imports: [RouterOutlet ,MatCardModule],
  templateUrl: './page-modif-user.component.html',
  styleUrl: './page-modif-user.component.css'
})
export class PageModifUserComponent {

}
