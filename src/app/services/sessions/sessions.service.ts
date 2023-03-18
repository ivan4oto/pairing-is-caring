import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PairingSession } from 'src/app/models/pairing-sessions';
import { Account } from 'src/app/models/accounts';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(private httpService: HttpClient) {}

  public updateSession(session: PairingSession) {
    const url = `${this.baseUrl}/sessions/${session.id}/update/`;
    return this.httpService.put(url, session);
  }

  public getSessions(): Observable<PairingSession[]> {
    const url = `${this.baseUrl}/sessions/list/`;
    return this.httpService.get<PairingSession[]>(url);
  }

  public createNewSession(startTime: string): Observable<PairingSession> {
    const url = `${this.baseUrl}/sessions/create/`;
    return this.httpService.post<PairingSession>(url, { start_time: startTime }); 
  }

  public getUsersInSession(sessionId: string): Observable<Account[]> {
    const url = `${this.baseUrl}/sessions/get-users/${sessionId}`
    return this.httpService.get<Account[]>(url);
  }
}
