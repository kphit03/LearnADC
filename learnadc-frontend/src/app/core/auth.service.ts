import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface JwtPayload {
  sub: string;
  authorities?: string[];  // adjust if your backend uses a different field
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/api/auth`;

  // tracks login state across the app
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // tracks admin-role state
  private isAdminSubject = new BehaviorSubject<boolean>(this.checkAdmin());
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Perform login; store token, update login + admin flags */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        const token = res.token;
        localStorage.setItem('token', token);
        this.isLoggedInSubject.next(true);
        this.isAdminSubject.next(this.checkAdmin());
      })
    );
  }

  /** Register new user (open to all) */
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      responseType: 'text'
    });
  }

  /** Clear token & reset login/admin flags */
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

  /** Retrieve raw JWT from storage */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  /** Check if a token exists */
  private hasToken(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  /** Decode payload of stored JWT */
  private parseJwt(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  /** Inspect payload for ROLE_ADMIN */
  private checkAdmin(): boolean {
    const payload = this.parseJwt();
    if (!payload || !payload.authorities) return false;
    return payload.authorities.includes('ROLE_ADMIN');
  }
}
