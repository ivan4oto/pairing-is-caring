import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UsersService } from 'src/app/services/users/users.service';
import { AccountListResponse, AccountOutputSerializer } from 'src/app/models/accounts';
import { PairingGroup, PairingSession } from 'src/app/models/pairing-sessions';
import { SessionsService } from 'src/app/services/sessions/sessions.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionDialogComponent } from '../session-dialog/session-dialog.component';

@Component({
  selector: 'app-paring-table',
  templateUrl: './paring-table.component.html',
  styleUrls: ['./paring-table.component.scss']
})
export class ParingTableComponent implements OnInit {
  private currentGroup: PairingGroup | undefined;
  public sessionGroup!: string;
  public allSessions!: PairingSession[];
  public sessions!: Record<number, AccountListResponse[]>
  
  constructor(
    private userService: UsersService,
    private sessionService: SessionsService,
    private groupsService: GroupsService,
    private jwtService: JwtService,
    private localStorageService: LocalStorageService,
    private alertsService: AlertsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (!jwtService.isLoggedIn() && !groupsService.isGroupSet()) {
      router.navigate(['unauthorized'])
    }
    this.currentGroup = this.groupsService.getGroup();
  }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()) {
      this.loadJustSessions();
      this.loadAccounts();
    }
  }

  private loadJustSessions(): void {
    this.sessionService.getSessions().subscribe((response: PairingSession[]) => {
      this.allSessions = response;
    })
  }

  private loadAccounts(): void {
    if (!this.currentGroup) {
      return;
    }
    this.userService.getUsersByGroup(this.currentGroup.name).subscribe((response: AccountListResponse[]) => {
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

  public exitGroup(): void{
    this.groupsService.removeGroup();
    const user = this.jwtService.getUser();
    user.pairing_group = undefined;
    this.userService.updateUser(user).subscribe(response => {
      this.localStorageService.setUser(response);
      this.alertsService.showSuccessMsg(
        'You have successfully left the group.',
        'Group leave success!'
      )
      this.router.navigate(['groups'])
    })
  }

  public openDialog(sessionId: string): void {
    const session = this.getSessionById(sessionId);
    if (session) {
      const dialogRef = this.dialog.open(SessionDialogComponent, {
        data: session
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  public isGroupActive(): boolean {
    return this.groupsService.isGroupSet()
  }

  public isUserLoggedIn(): boolean {
    return this.jwtService.isLoggedIn()
  }

}
