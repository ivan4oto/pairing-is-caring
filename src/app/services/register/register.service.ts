import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpService: HttpClient) {}

  public postUser(username: string, email: string, password: string) {
    const url = '';
    return this.httpService.post(url, {
      username: username,
      email: email,
      password: password,
    });
  }
}
