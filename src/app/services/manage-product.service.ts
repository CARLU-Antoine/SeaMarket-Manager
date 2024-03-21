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
  addProduct(categories: number[],productId:number,quantity:number, price: number, comment: string): Observable<any> {
    // Créer l'objet ProductData à partir des paramètres de la fonction
    const ProductData = {
      productId: productId,
      price: parseInt(price.toString()),
      quantity: parseInt(quantity.toString()),
      comments: comment,
      categorie:  categories
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
    return this.http.post<any>(this.apiUrl,ProductData, { headers: headers });
  }
  getListCategories(){
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });
    const urlCategories:string = 'http://127.0.0.1:8000/category/'; // Declare the variable urlCategories
    return this.http.get(urlCategories,{headers:headers});
  }
  getListAvailableProduct(){
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });
    const urlCategories:string =  'http://127.0.0.1:8000/products/redirection/';
    return this.http.get(urlCategories,{headers:headers});
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
