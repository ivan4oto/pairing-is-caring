import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/accounts';
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
    private router: Router
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

  public execute() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    this.usersService
      .loginUser(email, password)
      .subscribe((response) => {
        const expiresIn = Object(response)['expiresIn'];
        const accessId = Object(response)['access'];
        const userData = Object(response)['user'];

        this.jwtService.storeJwtToken(accessId, expiresIn, userData);
      });
  }
}

