import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private groupService: GroupsService
  ) {
  }

  ngOnInit(): void {}


  public logout(): void {
    this.jwtService.logout();
    this.groupService.removeGroup();
  }

  public isLoggedOut(): boolean {
    return !this.jwtService.isLoggedIn();
  }

  public isLoggedIn(): boolean {
    return this.jwtService.isLoggedIn();
  }
}
