import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatCardModule,MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

}
