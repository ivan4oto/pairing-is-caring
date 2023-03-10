import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/accounts';
import { JwtService } from 'src/app/services/jwt/jwt.service';
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
    private router: Router,
    private dialog: MatDialog
  ) {
    this.user = this.jwtService.getUser();
    if (!jwtService.isLoggedIn()) {
      router.navigate(['unauthorized'])
    }
    if (this.user.profile_image) {
      this.imagePath = this.user.profile_image.file;
    }
  }

  ngOnInit(): void {
  }

  public openDialog(): void {
    this.dialog.open(ImageUploadComponent, {
      data: this.user
    })
  }

}
