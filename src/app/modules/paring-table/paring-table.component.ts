import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paring-table',
  templateUrl: './paring-table.component.html',
  styleUrls: ['./paring-table.component.scss']
})
export class ParingTableComponent implements OnInit {
  public todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  public people = [
    {name: 'ivan', pairs: ['gosho', 'mitko']},
    {name: 'mitko', pairs: ['gosho', 'ivan']},
    {name: 'gosho', pairs: ['ivan', 'mitko']},
    {name: 'koce', pairs: []},
    {name: 'mimi', pairs: ['petya']},
    {name: 'petya', pairs: ['mimi']}
  ]

  public constructLists() {
    const resultList = new Set();
    this.people.forEach(obzekt => {
      console.log(obzekt)
      resultList.add([...obzekt.pairs, obzekt.name].sort())
    });
    console.log(resultList)
    return resultList;
  }


  public done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor() { }

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
    }
  }
}
