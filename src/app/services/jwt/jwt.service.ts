import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Account } from 'src/app/models/accounts';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  public storeJwtToken(tokenId: string, expiration: string, userData: string) {
    this.localStorageService.setTokenId(tokenId);
    this.localStorageService.setTokenExpiration(expiration);
    this.localStorageService.setUserString(userData);
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
    this.localStorageService.removeTokenId;
    this.localStorageService.removeTokenExpiration;
  }
}
