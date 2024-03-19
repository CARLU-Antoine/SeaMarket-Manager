import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModifUserService {

  private apiUrl = 'http://127.0.0.1:8000/manage_user/';

  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouvel utilisateur
  createUser(email: string, firstName: string, lastName: string, password: string, isAdmin: boolean): Observable<any> {
    // Récupérer le token JWT d'accès depuis le stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Données de l'utilisateur à envoyer dans la requête POST
    const userData = { email, firstName, lastName, password, isAdmin };

    // Effectuer la requête HTTP POST avec les en-têtes authentifiés
    return this.http.post<any>(this.apiUrl, userData, { headers });
  }

  // Méthode pour récupérer la liste des utilisateurs
  getUsers(): Observable<any[]> {
    // Récupérer les tokens JWT du stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Effectuer la requête HTTP GET avec les en-têtes authentifiés
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }

  deleteUserById(id: number): Observable<any> {
    // Récupérer le token JWT d'accès depuis le stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Paramètres de la requête DELETE (pour inclure l'ID de l'utilisateur à supprimer)
    const params = new HttpParams().set('id', id.toString());

    // Effectuer la requête HTTP DELETE avec les en-têtes authentifiés et les paramètres
    return this.http.delete<any>(this.apiUrl, { headers, params });
  }
  
}
