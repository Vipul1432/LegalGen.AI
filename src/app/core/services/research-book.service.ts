import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResearchBookService {

  private apiUrl = 'https://localhost:44330/api/ResearchBooks';

  constructor(private http: HttpClient) {}

  // Get JWT token from localStorage
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
  // Create a new research book
  createResearchBook(data: any): Observable<any> {
    debugger
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, data, { headers });
  }

  // Get a list of research books
  getResearchBooks(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl, {headers}).pipe(
      map((response) => response.data) // Extract the 'data' array from the API response
    );
  }

  // Update an existing research book
  updateResearchBook(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, data);
  }

  // Delete a research book
  deleteResearchBook(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
