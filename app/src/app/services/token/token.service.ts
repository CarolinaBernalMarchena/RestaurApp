import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getTokenAuthorization(): string | null {
    if (localStorage.getItem("token")) return "Bearer " + localStorage.getItem("token");
    return null
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  removeToken(): void {
    localStorage.removeItem("token");
  }

  constructor() { }
}
