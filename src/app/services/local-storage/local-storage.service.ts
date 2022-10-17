import { Injectable } from '@angular/core';
import { Account } from 'src/app/models/accounts';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}


  public setGroup(groupName: string): void {
    localStorage.setItem("pairingGroup", groupName);
  }

  public getGroup(): string | null {
    return localStorage.getItem('pairingGroup');
  }

  public removeGroup(): void {
    localStorage.removeItem('pairingGroup');
  }

  public setTokenId(tokenId: string): void {
    localStorage.setItem('id_token', tokenId);
  }
  
  public removeTokenId(): void {
    localStorage.removeItem('id_token');
  }
  
  public setTokenExpiration(expiration: string): void {
    localStorage.setItem('expires_at', expiration);
  }

  public getTokenExpiration(): string {
    return localStorage.getItem('expires_at') as string;
  }

  public removeTokenExpiration(): void {
    localStorage.removeItem('expires_at');
  }

  public setUser(user: Account): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public removeUserString(): void {
    localStorage.removeItem('user')
  }

  public getUserString(): string {
    return localStorage.getItem('user') as string;
  }
}
