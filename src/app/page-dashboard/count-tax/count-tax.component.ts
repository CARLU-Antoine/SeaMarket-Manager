import { Component,Input,OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
@Component({
  selector: 'app-count-tax',
  standalone: true,
  imports: [],
  templateUrl: './count-tax.component.html',
  styleUrl: './count-tax.component.css'
})
export class CountTaxComponent implements OnInit {

  @Input() taxCount: number = 0;

  constructor(private accountingService: AccountingService) { }

  ngOnInit(): void {
    this.recoverRevenue();
  }

  recoverRevenue(): void {
    // Appelez la méthode getTax de accountingService
    this.accountingService.getTax().subscribe(
      (data: any) => {
        // Mettez à jour taxCount avec les données récupérées
        this.taxCount = data.tax; // Assurez-vous de modifier "data.tax" en fonction de la structure des données renvoyées par votre service
      },
      (error) => {
        console.error(error); // Gérez les erreurs
      }
    );
  }
}