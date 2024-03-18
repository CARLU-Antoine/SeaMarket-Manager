import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {

  private apiUrl = 'http://127.0.0.1:8000/manage_product/';

  constructor(private http: HttpClient) { }

  // Fonction pour mettre à jour un produit
  updateProduct(updatedProductData: any) {
    const url = this.apiUrl; // Utiliser l'URL de base
    return this.http.patch(url, updatedProductData)
      .pipe(
        catchError(error => {
          // Gérer l'erreur ici (par exemple, afficher un message d'erreur)
          console.error('Une erreur s\'est produite lors de la mise à jour du produit:', error);
          return throwError(error); // Renvoyer une erreur observable pour que le composant appelant puisse la gérer
        })
      );
  }  
}
