import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { UsersService } from 'src/app/services/users/users.service';
import { AccountListResponse } from 'src/app/models/accounts';

@Component({
  selector: 'app-paring-table',
  templateUrl: './paring-table.component.html',
  styleUrls: ['./paring-table.component.scss']
})
export class ParingTableComponent implements OnInit {
  public allUsers!: any[];
  
  constructor(
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: AccountListResponse[]) => {
      const arrayOfSessions = _.groupBy(response, ({pairing_session: { id }}) => `${id}`)
      this.allUsers = Object.values(arrayOfSessions)
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.getSessionId(event.container)
      // console.log(event);
      // console.log(event.container.data[event.currentIndex]);
    }
  }

  public getSessionId(container: CdkDropList): void {
    // console.log(container.data)
    if (container.data.length === 1) {
      console.log('Empty container!')
    } else {
      console.log(container.data[0].pairing_session.id + ' <-- Session id')
    }

  }
}
// We should constantly have an empty droplist container at the bottom and when we drop
// a box we should send the Account for update to the backend with empty pairing_session property
// then the backend should create a new one and add it to the account then return it back.

// Is there a better way to get the session id when we add a new account to populated container?

// Is it possible for the container to have an id or property identical to the pairing_session id
// of the Accounts when first created?
