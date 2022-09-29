import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountListResponse, AccountOutputSerializer } from 'src/app/models/accounts';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(private httpService: HttpClient) {}

  public postUser(username: string, email: string, password: string) {
    const url = `${this.baseUrl}/accounts/create/`;
    const body = {
      username,
      email,
      password,
    };
    return this.httpService.post(url, body);
  }

  public updateUser(user: AccountOutputSerializer): Observable<Account> {
    const url = `${this.baseUrl}/accounts/${user.id}/update/`;
    return this.httpService.post<Account>(url, user);
  }

  public loginUser(username: string, password: string) {
    const url = `${this.baseUrl}/api/token/`;
    const body = {
      username,
      password
    };
    return this.httpService.post(url, body);
  }

  public getUsers(): Observable<AccountListResponse[]> {
    const url = `${this.baseUrl}/accounts/list/`;
    return this.httpService.get<AccountListResponse[]>(url);
  }
}
