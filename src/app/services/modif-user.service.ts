import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'; // Importer CryptoJS

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

    const hashedPassword = CryptoJS.MD5(password).toString(); // Hasher le mot de passe

    // Données de l'utilisateur à envoyer dans la requête POST
    const userData = { email, firstName, lastName, hashedPassword, isAdmin };

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
    const accessToken = localStorage.getItem('accessToken');
  
    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });
  
    const userData = { id };
  
    // Effectuer la requête DELETE avec les en-têtes appropriés
    return this.http.delete<any>(this.apiUrl, { headers, body: userData });
  }
  
  
}
