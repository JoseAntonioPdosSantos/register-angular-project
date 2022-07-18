import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Auth } from '../model/auth';
import { Credentials } from '../model/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PROXY_CONFIG } from 'src/proxy.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = '';
  jwtHelper: JwtHelperService;

  constructor(private httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  auth(credentials: Credentials): Observable<Auth> {
    return this.httpClient
      .post<Auth>(`${PROXY_CONFIG.baseURL}/auth`, credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(retry(1));
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token') || '';
    return !!this.token && !this.jwtHelper.isTokenExpired(this.token);
  }
}
