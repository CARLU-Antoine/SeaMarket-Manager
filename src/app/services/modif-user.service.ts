import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Cette ligne enregistre le service au niveau du module racine
})
export class ModifUserService {

  private apiUrl = 'http://127.0.0.1:8000/manage_user/';

  constructor(private http: HttpClient) { }
    // Méthode pour créer un nouvel utilisateur
    createUser(email: string, firstName: string, lastName: string, password: string, isAdmin:boolean) {
      // Envoyer une requête POST vers votre backend Django avec les données de l'utilisateur
      const userData = { email: email, firstName: firstName, lastName: lastName, password: password,isAdmin: isAdmin };
      return this.http.post<any>(this.apiUrl, userData);
    }

    getUsers(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

}