import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('auth_token'));
  
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  get isLoggedIn$() {
    return this.authStatus.asObservable();
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token); // Enregistrement du token
          this.authStatus.next(true);
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

logout(): Observable<any> {
  const token = this.getToken();
  const headers = { 'Authorization': `Bearer ${token}` };
  
  return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
    tap(() => {
      localStorage.removeItem('auth_token');
      this.authStatus.next(false);
    })
  );
}
}