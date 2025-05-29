import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/interfaces/login-request.model';
import { LoginResponse } from 'src/app/interfaces/login-response.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // URL de tu backend

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token); // Guarda el token en el almacenamiento local
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken'); // Recupera el token
  }

  // Método para decodificar el token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token); // Decodifica el token y retorna el payload
    } catch (error) {
      console.error("Error decoding token", error);
      return null; // Retorna null si hay un error
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true si el token existe
  }

  logOut(): void {
    localStorage.removeItem('jwtToken'); // Elimina el token al cerrar sesión
  }
}





