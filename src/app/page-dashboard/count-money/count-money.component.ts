<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';

=======
import { Component, Input, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { StatsRevenuesService } from '../../services/stats-revenues.service';
>>>>>>> main
@Component({
  selector: 'app-count-money',
  standalone: true,
  imports: [
    MatCard,
  ],
  templateUrl: './count-money.component.html',
  styleUrl: './count-money.component.css'
})
<<<<<<< HEAD
export class CountMoneyComponent {
  @Input() moneyCount: number = 0;
=======
export class CountMoneyComponent implements OnInit{

  constructor(private statsRevenuesService: StatsRevenuesService) { }
  
  @Input() moneyCount: number = 0;

  ngOnInit(): void {
    this.RecoverRevenue();
  }

  RecoverRevenue(): void {
    // Appelez la méthode getChartDataRevenues avec les valeurs de catégorie et de type
    this.statsRevenuesService.getDataRevenues('all', 'day').subscribe(
      (data: any) => {
        // Parsez la chaîne JSON pour obtenir un tableau d'objets JavaScript
        const jsonData = JSON.parse(data);
        
        // Initialiser une variable pour stocker le revenu total
        let totalRevenue = 0;
  
        // Parcourir le tableau jsonData
        for (const item of jsonData) {
          // Ajouter la valeur de chaque objet à totalRevenue
          totalRevenue += item.value;
        }
  
        // Assigner le revenu total à la propriété moneyCount
        this.moneyCount = totalRevenue;
  
      },
      (error) => {
        console.error(error); // Gérez les erreurs
      }
    );
  }
  
>>>>>>> main
}
