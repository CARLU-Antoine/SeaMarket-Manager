import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js'; // Importer CryptoJS

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Méthode pour authentifier l'utilisateur et obtenir le token
  login(email: string, password: string): Observable<any> {
    const hashedPassword = CryptoJS.MD5(password).toString(); // Hasher le mot de passe
    
    return this.http.post<any>('http://127.0.0.1:8000/login/', { email, password: hashedPassword });
  }
    
    // Méthode pour vérifier si l'utilisateur est connecté
    isLoggedIn(): boolean {
      if (typeof localStorage !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');
        return !!accessToken; // Retourne true si le token est présent, false sinon
      } else {
        // Gérer le cas où localStorage n'est pas disponible
        return false;
      }
    }

      // Méthode pour rafraîchir le token d'accès
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/login/refreshtoken/', { refresh: refreshToken })
      .pipe(
        catchError(error => {
          // Si le rafraîchissement échoue, déconnectez l'utilisateur et redirigez-le vers la page de login
          this.logout();
          // Ajoutez ici le code pour rediriger l'utilisateur vers la page de login
          throw error; // relancez l'erreur pour que le composant puisse la gérer
        })
      );
  }


  // Méthode pour se déconnecter de l'application
  logout(): void {
    // Supprimer les jetons d'authentification du stockage local
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
