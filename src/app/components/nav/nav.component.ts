import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public imagePath!: string;

  constructor(
    private jwtService: JwtService,
    private groupService: GroupsService,
    private userService: UsersService,
    private router: Router,
    private alertsService: AlertsService
  ) {
    this.imagePath = userService.getUserProfilePic();
  }

  ngOnInit(): void {
  }


  public logout(): void {
    this.jwtService.logout();
    this.groupService.removeGroup();
    this.alertsService.showSuccessMsg(
      'You have successfully logged out.',
      'Log out success'
    )
    this.router.navigate(['login'])
  }

  public openProfilePage(): void {
    this.router.navigate(['profile-page'])
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
