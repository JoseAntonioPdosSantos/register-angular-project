import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROXY_CONFIG } from 'src/proxy.config';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  users$ = Observable<User[]>;

  constructor(
    private httpClient: HttpClient,
  ) {}

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(`${PROXY_CONFIG.baseURL}/user`, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${PROXY_CONFIG.baseURL}/user/${id}`, user);
  }

  findById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${PROXY_CONFIG.baseURL}/user/${id}`);
  }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${PROXY_CONFIG.baseURL}/user`);
  }

  delete(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${PROXY_CONFIG.baseURL}/user/${id}`);
  }
}
