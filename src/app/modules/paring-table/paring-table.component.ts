import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { UsersService } from 'src/app/services/users/users.service';
import { Account, AccountListResponse } from 'src/app/models/accounts';
import { PairingSession } from 'src/app/models/pairing-sessions';
import { SessionsService } from 'src/app/services/sessions/sessions.service';

@Component({
  selector: 'app-paring-table',
  templateUrl: './paring-table.component.html',
  styleUrls: ['./paring-table.component.scss']
})
export class ParingTableComponent implements OnInit {
  public allUsers!: any[];
  public allSessions!: PairingSession[];
  public sessions!: Record<number, AccountListResponse[]>
  
  constructor(
    private userService: UsersService,
    private sessionService: SessionsService
  ) {
  }

  ngOnInit(): void {
    this.loadSessions();


    this.userService.getUsers().subscribe((response: AccountListResponse[]) => {
      const arrayOfSessions = _.groupBy(response, ({pairing_session: { id }}) => `${id}`)
      this.sessions = arrayOfSessions;
      this.allUsers = Object.values(arrayOfSessions)
    });
  }

  private loadSessions() {
    this.sessionService.getSessions().subscribe((response: PairingSession[]) => {
      this.allSessions = response;
    })
  }


  private getSessionById(id: string): PairingSession | undefined {
    return this.allSessions.find(session => {
      return session.id === id;
    })
  }

  private updateUser(user: Account){
    this.userService.updateUser(user).subscribe((response) => {
      console.log(response);
      const id: number = +user.pairing_session.id;
      const userToUpdate = this.sessions[id].find(x => x.id === user.id);
      if (userToUpdate) {
        // userToUpdate.email = "UPDATED"
      }

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
      const droppedUser: Account = event.container.data[event.currentIndex];

      if (sessionId === '0') {
        // if user dropped into the empty box a new session is created
        // and added to the user.pairing_session
        // const newSession = this.getNewSession();
        droppedUser.pairing_session = {id: '', start_time: ''};
        this.updateUser(droppedUser);
        return;
      }

      const newUserSession = this.getSessionById(sessionId)
      if (newUserSession) {
        droppedUser.pairing_session = newUserSession;
        this.updateUser(droppedUser);
      }
      event.container.data[event.currentIndex].pairing_session.id = sessionId
    }
  }

  getNewSession(): PairingSession {
    throw new Error('Method not implemented.');
  }
}


// We should constantly have an empty droplist container at the bottom and when we drop
// a box we should send the Account for update to the backend with empty pairing_session property
// then the backend should create a new one and add it to the account then return it back.


// check if we can use one single model Account | AccountListResponse   ? ? ? ?