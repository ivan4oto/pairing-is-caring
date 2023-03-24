import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
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
    private alertsService: AlertsService,
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
    const username = this.registerForm.controls['username'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    this.usersService
      .postUser(username, email, password)
      .subscribe((success) => {
        this.alertsService.showSuccessMsg(
          `You have successfully created account with name: ${username}. You can now log in.`,
          'Register success.')
        this.router.navigate(['login'])
      }, (error) => {
        this.alertsService.showErrorMsg(
          'There has been an error while signing up. Please contact us for more details or try again.',
          'Sign up error'
        )
      });
  }
}
