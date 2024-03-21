<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
=======
import { Component, Input,OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ModifUserService } from '../../services/modif-user.service';
>>>>>>> main
@Component({
  selector: 'app-count-user',
  standalone: true,
  imports: [
    MatCard,
  ],
  templateUrl: './count-user.component.html',
  styleUrl: './count-user.component.css'
})
<<<<<<< HEAD
export class CountUserComponent {
  @Input() userCount: number = 0;
}
=======
export class CountUserComponent implements OnInit{
  @Input() userCount: number = 0;

  constructor(private modifUserService: ModifUserService) { }

  ngOnInit(): void {
    this.recoverUserCount();
  }

  recoverUserCount(): void {
    // Appelez la méthode getUsers de modifUserService
    this.modifUserService.getUsers().subscribe(
      (data: any) => {
        // Vérifiez si les données sont un tableau et s'il y a des éléments
        if (Array.isArray(data) && data.length > 0) {
          // Mettez à jour userCount avec le nombre d'utilisateurs récupérés
          this.userCount = data.length;
        } else {
          // Si les données ne sont pas un tableau ou s'il n'y a pas d'éléments, affectez 0 à userCount
          this.userCount = 0;
        }
      },
      (error) => {
        console.error(error); // Gérez les erreurs
      }
    );
  }
  
}

>>>>>>> main
