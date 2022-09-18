import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {}


  public logout(): void {
    this.jwtService.logout();
  }

  public isLoggedOut(): boolean {
    return !this.jwtService.isLoggedIn();
  }
}
