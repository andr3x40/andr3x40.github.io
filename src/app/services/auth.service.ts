import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface UserDetails {
  authenticated: boolean;
  name: string;
  email: string;
  login: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private detailsUrl = 'http://localhost:8080/api/auth/details';
  private rolesUrl = 'http://localhost:8080/api/auth/roles';
  
  constructor(private http: HttpService) { }
  
  /**
   * Gets the details of the authenticated user.
   * @returns an Observable with the details of the user
   */
  async getUserDetails(): Promise<UserDetails | null> {
    return this.http.getRequestBody<UserDetails>(this.detailsUrl);
  }

  /**
   * Gets the roles of the authenticated user.
   * @returns an Observable with the roles of the user
   */
  async getUserRoles(): Promise<[] | null> {
    return this.http.getRequestBody<[]>(this.rolesUrl);
  }

  /**
   * Checks if the authenticated user is an admin.
   */
  async isAdminUser(): Promise<boolean> {
    let roles: [] | null = await this.getUserRoles();
    return roles !== null && roles.find(x => x === "ROLE_ADMIN") !== undefined;
  }

  /**
   * Checks if the user is authenticated.
   */
  async isAuthenticated(): Promise<boolean> {
    let details: UserDetails | null = await this.getUserDetails();
    return details !== null && details.authenticated;
  }

}
