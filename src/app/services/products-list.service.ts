import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root' // Cette ligne enregistre le service au niveau du module racine
})
export class ProductsListService {

  private apiUrl = 'http://127.0.0.1:8000/products';

  constructor(private http: HttpClient) { }
  productData = new BehaviorSubject<any[]>([]);
  // Méthode pour récupérer la liste des produits
  getProducts(): Observable<any[]> {
    // Récupérer les tokens JWT du stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Effectuer la requête HTTP GET avec les en-têtes authentifiés
    return this.http.get<any[]>(this.apiUrl, { headers: headers }).pipe(
      tap((response) => {
        this.productData.next(response);
      })
    );
  }
  getProductByCategory(idCategory:number): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    const urlCategories:string = 'http://127.0.0.1:8000/products/'+idCategory+'/'; // Declare the variable urlCategories
    console.log(urlCategories)
    return this.http.get<any[]>(urlCategories,{headers:headers});
  }
}
