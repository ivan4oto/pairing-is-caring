import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { UsersService } from 'src/app/services/users/users.service';
import { Account, AccountListResponse, AccountOutputSerializer } from 'src/app/models/accounts';
import { PairingSession } from 'src/app/models/pairing-sessions';
import { SessionsService } from 'src/app/services/sessions/sessions.service';

@Component({
  selector: 'app-paring-table',
  templateUrl: './paring-table.component.html',
  styleUrls: ['./paring-table.component.scss']
})
export class ParingTableComponent implements OnInit {
  private currentGroup: string;
  public sessionGroup!: string;
  public allSessions!: PairingSession[];
  public sessions!: Record<number, AccountListResponse[]>
  
  constructor(
    private userService: UsersService,
    private sessionService: SessionsService
  ) {
    this.currentGroup = this.sessionService.getGroup() || '';
  }

  ngOnInit(): void {
    this.loadJustSessions();
    this.loadAccounts();
  }

  private loadJustSessions(): void {
    this.sessionService.getSessions().subscribe((response: PairingSession[]) => {
      this.allSessions = response;
    })
  }

  private loadAccounts(): void {
    this.userService.getUsersByGroup(this.currentGroup).subscribe((response: AccountListResponse[]) => {
      const arrayOfSessions = _.groupBy(response, ({pairing_session: { id }}) => `${id}`)
      this.sessions = arrayOfSessions;
      this.sessions['0'] = [];
    });
  }


  private getSessionById(id: string): PairingSession | undefined {
    return this.allSessions.find(session => {
      return session.id === id;
    })
  }

  private updateUser(user: AccountOutputSerializer){
    this.userService.updateUser(user).subscribe((response) => {
      console.log('User updated')
      console.log(response)
    });
  }

  private deleteSessionContainerIfEmpty(id: number) {
    if (this.sessions[id].length === 0) {
      delete this.sessions[id] // deletes empty container
    }
  }

  public unpair(user: AccountOutputSerializer) {
    const now = new Date(); // gets current datetime
    // sends current time to create new Pairing Session, adds it to the user(Account) and updates him in the DB
    this.sessionService.createNewSession(now.toISOString()).subscribe((response:PairingSession) => {
      user.pairing_session = response;
      const id: number = +response.id;
      this.sessions[id] = [ user as AccountListResponse ];
      this.sessions[0] = [];
      this.updateUser(user)
    });
  }

  public drop(event: CdkDragDrop<any>, sessionId: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const droppedUser: AccountOutputSerializer = event.container.data[event.currentIndex];

      if (sessionId === '0') {
        this.unpair(droppedUser);
        this.deleteSessionContainerIfEmpty(+droppedUser.pairing_session.id)
        return;
      }
      this.deleteSessionContainerIfEmpty(+droppedUser.pairing_session.id)
      const newUserSession = this.getSessionById(sessionId)
      if (newUserSession) {
        droppedUser.pairing_session = newUserSession;
        this.updateUser(droppedUser); // adds the new pairing session to the Account & updated DB
      }
      event.container.data[event.currentIndex].pairing_session.id = sessionId
    }
  }
}


// We should constantly have an empty droplist container at the bottom and when we drop
// a box we should send the Account for update to the backend with empty pairing_session property
// then the backend should create a new one and add it to the account then return it back.


// check if we can use one single model Account | AccountListResponse   ? ? ? ?