import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:44330/api/user';
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Add JWT token to headers
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registerUser(data: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, data);
  }



  login(logindata: any): Observable<any> {
    debugger
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, logindata, { headers });
  }
  
  // Retrieve logged-in user's ID from the API
  getLoggedInUserId(): Observable<string> {
    const url = `${this.apiUrl}/UserId`;
    const headers = this.getHeaders();
  
    return this.http.get(url, { headers, responseType: 'text' });
  }
  getProfileDetails(): Observable<any> {
    const url = `${this.apiUrl}/profile-details`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, {headers});
  }

  getUserName(): Observable<string> {
    return this.getProfileDetails().pipe(
      map(data => `${data.firstName} ${data.lastName}`)
    );
  }

  generateUserInitials(fullName: string): string {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
    } else if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      return '';
    }
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  
  logout(): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/logout`;
    return this.http.post(url, {headers});
  }

  updateProfile(profileData: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/update-profile`;
    return this.http.put(url, profileData, {headers});
  }

  changePassword(passwordData: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/change-password`;
    return this.http.post(url, passwordData, {headers});
  }

  forgetPassword(email: string): Observable<any> {
    const url = `${this.apiUrl}/forget-password/${email}`;
    return this.http.post(url, null);
  }
}