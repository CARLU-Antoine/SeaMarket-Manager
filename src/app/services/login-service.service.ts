import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // Méthode pour authentifier l'utilisateur et obtenir le token
  login(email: string, password: string) {
    return this.http.post<any>('http://127.0.0.1:8000/login/', { email, password });
  }

  // Méthode pour rafraîchir le token d'accès
  refreshToken(refreshToken: string) {
    return this.http.post<any>('http://127.0.0.1:8000/login/refreshtoken/', { refresh: refreshToken });
  }

}
