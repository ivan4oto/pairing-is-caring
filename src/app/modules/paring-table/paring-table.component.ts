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
  public sessions!: Record<number, AccountListResponse[]>
  
  constructor(
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: AccountListResponse[]) => {
      const arrayOfSessions = _.groupBy(response, ({pairing_session: { id }}) => `${id}`)
      this.sessions = arrayOfSessions;
      this.allUsers = Object.values(arrayOfSessions)
    });
  }

  public drop(event: CdkDragDrop<any>, sessionId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(event.container.data[event.currentIndex])
      event.container.data[event.currentIndex].pairing_session.id = sessionId
    }
  }
}


// We should constantly have an empty droplist container at the bottom and when we drop
// a box we should send the Account for update to the backend with empty pairing_session property
// then the backend should create a new one and add it to the account then return it back.
