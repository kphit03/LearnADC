import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface ContactRequest { //structure of how we are sending the data (matches backend DTO)
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private apiUrl = `${environment.apiBaseUrl}/api/contact`; // adding our api url to this component/class

  constructor(private http: HttpClient) { }

  // sendContactForm(data: ContactRequest): Observable<string> {
  //   return this.http.post(this.apiUrl, data, { responseType: 'text' }); //responseType is the response we expect from the backend.
  // }
  sendContactForm(data: ContactRequest): Observable<string> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // 👈 Intentionally omitting Authorization
  });

  return this.http.post(this.apiUrl, data, {
    headers,
    responseType: 'text'
  });
}

}
