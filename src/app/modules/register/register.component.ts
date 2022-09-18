import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private router: Router
    ) {}

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate(['']);
    }
    this.buildRegisterForm();
  }

  public buildRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public execute() {
    const unsername = this.registerForm.controls['username'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    this.usersService
      .postUser(unsername, email, password)
      .subscribe(console.log);
  }
}
