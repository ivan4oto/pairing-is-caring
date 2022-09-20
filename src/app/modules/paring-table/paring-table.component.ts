import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paring-table',
  templateUrl: './paring-table.component.html',
  styleUrls: ['./paring-table.component.scss']
})
export class ParingTableComponent implements OnInit {
  // public todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  public pairs!: any[];
  todoList3="todoList3"
  public people = [
    {name: 'ivan', pairs: ['gosho', 'mitko']},
    {name: 'mitko', pairs: ['gosho', 'ivan']},
    {name: 'gosho', pairs: ['ivan', 'mitko']},
    {name: 'koce', pairs: []},
    {name: 'mimi', pairs: ['petya']},
    {name: 'petya', pairs: ['mimi']}
  ]
  

  public constructLists(): any[] {
    const resultList = new Array();
    this.people.forEach(obzekt => {
      console.log(obzekt)
      resultList.push([...obzekt.pairs, obzekt.name].sort())
    });
    const uniqarray = _.uniqWith(resultList, _.isEqual);
    this.pairs = uniqarray;
    return uniqarray;
  }


  public done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor() {
  }

  ngOnInit(): void {
    this.constructLists();
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
      console.log(this.pairs);
    }
  }
}
