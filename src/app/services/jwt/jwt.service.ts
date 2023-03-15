import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Account } from 'src/app/models/accounts';
import { FileImage } from 'src/app/models/fileUpload';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  public storeJwtToken(tokenId: string, expiration: string, userData: Account) {
    this.localStorageService.setTokenId(tokenId);
    this.localStorageService.setTokenExpiration(expiration);
    this.localStorageService.setUser(userData);
  }

  getUser(): Account {
    const jsonUser = this.localStorageService.getUserString();
    const user: Account = JSON.parse(jsonUser);
    if (!user.profile_image) {
      user.profile_image = {
        id: -1,
        file: 'https://www.meme-arsenal.com/memes/4025aa16b90b53e92746a96f1368cb4f.jpg'
      } as FileImage;
    }
    return user;
  }
  
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  
  private getExpiration() {
    const expiration = this.localStorageService.getTokenExpiration();
    return moment(expiration);
  }  

  public logout() {
    this.localStorageService.removeTokenId();
    this.localStorageService.removeTokenExpiration();
    this.localStorageService.removeUserString();
  }
}
