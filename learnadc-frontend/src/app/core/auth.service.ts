import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  //tracks login state across the app
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token); //save JWT token to local storage
        this.isLoggedInSubject.next(true); //notify app that user is logged in
      })
    );
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      responseType: 'text'
    });
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    if (typeof window == 'undefined') {
      return false;
    }
    return !!localStorage.getItem('token');
  }
}
