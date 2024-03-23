import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageHistoryService {
  private apiUrl = 'http://127.0.0.1:8000/manage_history/';

  constructor(private http: HttpClient) { }

  getChartData(): Observable<any[]> {
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
}

