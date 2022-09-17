import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  public buildLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public execute() {
    const unsername = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    this.usersService
      .loginUser(unsername, password)
      .subscribe(console.log);
  }
}

