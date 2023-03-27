import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/accounts';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  fileName = '';
  fileType = '';
  imagePath = '';
  fileToUpload!: File;
  public user: Account;

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private alertsService: AlertsService
  ) {
    this.user = this.jwtService.getUser();
    if (!jwtService.isLoggedIn()) {
      router.navigate(['unauthorized'])
    }
    this.imagePath = this.usersService.getUserProfilePic(this.user);
  }

  ngOnInit(): void {
  }

  public openDialog(): void {
    let dialogRef = this.dialog.open(ImageUploadComponent, {
      data: this.user,
      height: '150px',
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        location.reload(); // this should be temporary, we need to update pic without reload
        // this.alertsService.showSuccessMsg('Upload successful', 'Profile picture successfully changed.')
      }
    })

  }

}
