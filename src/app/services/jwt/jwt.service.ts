import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Account } from 'src/app/models/accounts';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  public storeJwtToken(idToken: string, expiresIn: string, userData: string) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresIn);
    localStorage.setItem('user', JSON.stringify(userData))
  }

  getUser(): Account {
    const jsonUser = localStorage.getItem('user') || '';
    return JSON.parse(jsonUser) as Account;
  }
  
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  
  private getExpiration() {
    const expiration = localStorage.getItem("expires_at") as string;
    return moment(expiration);
  }  

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
}
