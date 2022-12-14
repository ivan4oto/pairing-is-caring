import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/accounts';
import { PairingGroup } from 'src/app/models/pairing-sessions';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private groupService: GroupsService,
    private router: Router,
    private alertsService: AlertsService
    ) { }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate([''])
    }
    this.buildLoginForm();
  }

  public buildLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private storeLoginResponse(response: any) {
    const expiresIn = Object(response)['expiresIn'];
    const accessId = Object(response)['access'];
    const userData = Object(response)['user'] as  Account;
    const userGroup = userData.pairing_group as PairingGroup;
    this.groupService.setGroup(userGroup)
    this.jwtService.storeJwtToken(accessId, expiresIn, userData);

  }

  public execute() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.usersService
      .loginUser(email, password)
      .subscribe(

        (response) => {
          this.storeLoginResponse(response);
          this.alertsService.showSuccessMsg(
            'You have successfuly logged in!',
            'Login Successful'
          )
          this.router.navigate(['groups'])
        },
        (error) => {
          this.alertsService.showErrorMsg(
            'There has been an error while logging in. Please check your credentials and try again.',
            'Error logging in')
        });
  }
}

