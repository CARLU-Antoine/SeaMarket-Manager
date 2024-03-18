import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  private apiUrl = 'http://127.0.0.1:8000/products';

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}