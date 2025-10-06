import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaccia per i dati che ci aspettiamo
export interface UserDetails {
  name: string;
  email: string;
  login: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/user/details';
  
  constructor(private http: HttpClient) { }
  
  /**
   * Gets the details of the authenticated user.
   * @returns an Observable with the details of the user, or con i dettagli dell'utente o un errore.
   */
  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.apiUrl, { withCredentials: true });
  }
}
