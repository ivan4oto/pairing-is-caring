import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/accounts';
import { FileImage } from 'src/app/models/fileUpload';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';

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
    private fileUploadService: FileUploadService,
    private jwtService: JwtService,
    private userService: UsersService
  ) {
    this.user = this.jwtService.getUser();
    if (this.user.profile_image) {
      this.imagePath = this.user.profile_image.file;
    }
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileType = file.type;
      this.fileToUpload = file;
      // const formData = new FormData();
      // formData.append("thumbnail", file);
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      // upload$.subscribe();
    }
  }
  
  directUploadStart(): void {
    if (this.fileToUpload) {
      this.fileUploadService.startUpload(this.fileName, this.fileType).subscribe(response => {
        console.log(response);
        this.directUploadDo(response, this.fileToUpload);
      });
    } else {
      console.log('You need to select a file!')
    }

  }
  directUploadFinish(data: any) {
    return this.fileUploadService.finishUpload(data.id);
  }

  directUploadDo(data: any, file: File): void {
    this.fileUploadService.uploadFileToS3(data, file).subscribe(() => {
      this.directUploadFinish(data).subscribe((fileIdResponse: FileImage) => {
        this.fileName = fileIdResponse.file;
        this.updateUserProfilePic(fileIdResponse);
      });
    });
  }

  updateUserProfilePic(image: FileImage){
    this.user.profile_image = image;
    this.userService.updateUser(this.user).subscribe(userResponse => {
      console.log(userResponse);
    });
  }

}
