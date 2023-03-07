import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/accounts';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  @Input() user!: Account;

  constructor() { }

  ngOnInit(): void {
  }

}
