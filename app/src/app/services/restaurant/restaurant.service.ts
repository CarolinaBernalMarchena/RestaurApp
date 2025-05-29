// restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'http://localhost:8080'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  getOwnerRestaurants(ownerId: number): Observable<Restaurant[]> {
    const token = localStorage.getItem('jwtToken'); // Asumiendo que guardas el token JWT
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
    });

    return this.http.get<Restaurant[]>(`${this.baseUrl}/owner/restaurants`, { headers });
  }
}