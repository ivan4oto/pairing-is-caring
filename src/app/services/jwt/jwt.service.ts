import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  public storeJwtToken(idToken: string, expiresIn: string) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem("expires_at", expiresIn);
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