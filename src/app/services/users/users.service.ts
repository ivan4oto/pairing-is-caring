import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/accounts';
import { PairingGroup } from 'src/app/models/pairing-sessions';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://127.0.0.1:8000';
  private defaultProfilePicUrl = 'https://www.meme-arsenal.com/memes/4025aa16b90b53e92746a96f1368cb4f.jpg';

  constructor(
    private httpService: HttpClient,
    private localStorageService: LocalStorageService
    ) {}
  
  public postUser(username: string, email: string, password: string) {
    const url = `${this.baseUrl}/accounts/create/`;
    const body = {
      username,
      email,
      password,
    };
    return this.httpService.post(url, body);
  }
  
  public getUser(username: string): Observable<Account> {
    const url = `${this.baseUrl}/accounts/`;
    return this.httpService.post<Account>(url, {username: username});
  }
  
  public updateUser(user: Account): Observable<Account> {
    const url = `${this.baseUrl}/accounts/${user.id}/update/`;
    return this.httpService.post<Account>(url, user);
  }

  public loginUser(email: string, password: string) {
    const url = `${this.baseUrl}/api/token/`;
    const body = {
      email,
      password,
    };
    return this.httpService.post(url, body);
  }
  
  public getUsers(): Observable<Account[]> {
    const url = `${this.baseUrl}/accounts/list/`;
    return this.httpService.get<Account[]>(url);
  }
  
  public getUsersByGroup(groupName: string): Observable<Account[]> {
    const url = `${this.baseUrl}/accounts/list/${groupName}`;
    return this.httpService.get<Account[]>(url);
  }

  public getGroups(): Observable<PairingGroup[]>{
    const url = `${this.baseUrl}/groups/list/`; 
    return this.httpService.get<PairingGroup[]>(url);
  }

  public postGroup(group: PairingGroup) {
    const url = `${this.baseUrl}/groups/create/`;
    return this.httpService.post(url, group);
  }

  public getActiveUser(): Account {
    const jsonUser = this.localStorageService.getUserString();
    return JSON.parse(jsonUser) as Account;
  }

  public postFileData(name: string, type: string) {
    const url = `${this.baseUrl}/api/upload/start/`;
    return this.httpService.post(url, {file_name: name, file_type: type});
  }

  public refreshUserData(id: number) {
    const url = `${this.baseUrl}/accounts/get/${id}`;
    this.httpService.get<Account>(url).subscribe(
      response => {
        this.localStorageService.setUser(response);
      }
    );
  }

  public getUserProfilePic(): string {
    const activeUser: Account = this.getActiveUser();
    console.log(activeUser);
    if (activeUser && activeUser.profile_image) {
      const profileImage: string = activeUser.profile_image.file;
      return profileImage;
    }
    return this.defaultProfilePicUrl;
  }

  public generateProfilePicPlaceholder(username: string): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('Unable to create canvas context');
    }
  
    // Set canvas size
    canvas.width = 128;
    canvas.height = 128;
  
    // Draw background
    ctx.fillStyle = this.generateHexColorFromString(username);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw initials
    const initials = username.charAt(0) + username.charAt(1);
    ctx.fillStyle = '#fff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(initials.toUpperCase(), canvas.width / 2, canvas.height / 2 + 16);
  
    // Return data URL of the image
    return canvas.toDataURL();
  }

  private generateHexColorFromString(input: string): string {
    let hash = 0;
  
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let hexColor = '#';
  
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      hexColor += value.toString(16).padStart(2, '0');
    }
  
    return hexColor;
  }
}
