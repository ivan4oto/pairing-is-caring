import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(private httpService: HttpClient) {}

  public postUser(username: string, email: string, password: string) {
    const url = `${this.baseUrl}/users/`;
    const body = {
      username,
      email,
      password,
    };
    return this.httpService.post(url, body);
  }

  public loginUser(username: string, password: string) {
    const url = `${this.baseUrl}/api/token/`;
    const body = {
      username,
      password
    };
    return this.httpService.post(url, body);
  }
}
