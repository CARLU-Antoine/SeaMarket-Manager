import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Méthode pour authentifier l'utilisateur et obtenir le token
  login(email: string, password: string) {
    return this.http.post<any>('http://127.0.0.1:8000/login/', { email, password });
  }

  // Méthode pour rafraîchir le token d'accès
  refreshToken(refreshToken: string) {
    return this.http.post<any>('http://127.0.0.1:8000/login/refreshtoken/', { refresh: refreshToken });
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // Retourne true si le token est présent, false sinon
  }
    
  // Méthode pour se déconnecter de l'application
    logout(): void {
      // Supprimer les jetons d'authentification du stockage local
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
}