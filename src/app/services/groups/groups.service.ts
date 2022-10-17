import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/accounts';
import { PairingGroup } from 'src/app/models/pairing-sessions';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {

  constructor(
    private httpService: HttpClient,
    private localStorageService: LocalStorageService
    ) {}
  private baseUrl = 'http://127.0.0.1:8000';


  public getGroups(): Observable<PairingGroup[]>{
    const url = `${this.baseUrl}/groups/list/`; 
    return this.httpService.get<PairingGroup[]>(url);
  }
  
  public postGroup(group: PairingGroup) {
    const url = `${this.baseUrl}/groups/create/`;
    return this.httpService.post(url, group);
  }

    
  public setGroup(group: PairingGroup): void {
    this.localStorageService.setGroup(JSON.stringify(group))
  }

  public removeGroup(): void {
    this.localStorageService.removeGroup();
  }

  public getGroup(): PairingGroup | undefined {
    const jsonGroup = this.localStorageService.getGroup();
    if (jsonGroup){
      return JSON.parse(jsonGroup) as PairingGroup;
    }
    return undefined;
  }
  
}
