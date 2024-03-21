import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsMarginService {
  private apiUrl = 'http://127.0.0.1:8000/stats/margin/';

  constructor(private http: HttpClient) { }

  getChartDataMargin(category: string, type: string): Observable<any[]> {
    // Récupérer les tokens JWT du stockage local
    const accessToken = localStorage.getItem('accessToken');

    // Construire les en-têtes avec le token JWT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Inclure le token JWT d'accès dans l'en-tête Authorization
    });

    // Paramètres de la requête
    const params = { category: category, type: type };

    // Effectuer la requête HTTP GET avec les en-têtes authentifiés et les paramètres de requête
    return this.http.get<any[]>(this.apiUrl, { headers: headers, params: params });
  }
}

