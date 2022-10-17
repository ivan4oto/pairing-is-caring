import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  constructor(
    private jwtService: JwtService,
    private groupService: GroupsService,
    private userService: UsersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {}


  public logout(): void {
    this.jwtService.logout();
    this.groupService.removeGroup();
    this.router.navigate(['login'])
  }

  public isLoggedOut(): boolean {
    return !this.jwtService.isLoggedIn();
  }

  public isLoggedIn(): boolean {
    return this.jwtService.isLoggedIn();
  }

  public getUserName(): string {
    return this.userService.getActiveUser().username;
  }
}
