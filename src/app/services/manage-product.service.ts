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
  addProduct(categorie: number,name:string,quantity:number, price: number, comment: string): Observable<any> {
    // Créer l'objet ProductData à partir des paramètres de la fonction
    const ProductData = {
      id: 100,
      productId: 100,
      price: parseInt(price.toString()),
      percentSale:100,
      quantity: parseInt(quantity.toString()),
      sellArticle:200,
      comment: comment,
      categorie:  parseInt(categorie.toString())
    };

    console.log("product ajouté", ProductData);

    // Récupérer le token JWT d'accès depuis le stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Effectuer la requête HTTP PATCH avec les en-têtes authentifiés
    return this.http.post<any>(this.apiUrl, ProductData, { headers });
  }

  // Fonction pour mettre à jour un produit
  updateProduct(updatedProductData: any): Observable<any> {

    console.log("product modifier", updatedProductData)
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
