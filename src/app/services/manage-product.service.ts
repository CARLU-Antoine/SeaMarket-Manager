import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {

  private apiUrl = 'http://127.0.0.1:8000/manage_product/';

  constructor(private http: HttpClient) { }

  // Fonction pour mettre à jour un produit
  updateProduct(updatedProductData: any): Observable<any> {
    // Récupérer le token JWT d'accès depuis le stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Effectuer la requête HTTP PATCH avec les en-têtes authentifiés
    return this.http.patch<any>(this.apiUrl, updatedProductData, { headers });
  }
}
