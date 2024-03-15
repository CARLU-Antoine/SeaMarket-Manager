import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Cette ligne enregistre le service au niveau du module racine
})
export class ModifUserService {

  constructor(private http: HttpClient) { }
  
  
    // Méthode pour créer un nouvel utilisateur
    createUser(email: string, nom: string, prenom: string, password: string) {
      // Envoyer une requête POST vers votre backend Django avec les données de l'utilisateur
      const userData = { email: email, nom: nom, prenom: prenom, password: password };
      return this.http.post<any>('http://127.0.0.1:8000/manage_user/', userData);
    }

}
 