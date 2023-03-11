import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/accounts';
import { FileImage } from 'src/app/models/fileUpload';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  fileName = '';
  fileType = '';
  imagePath = '';
  fileToUpload!: File;
  public user: Account;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Account,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    private fileUploadService: FileUploadService,
    private userService: UsersService,
    private alertsService: AlertsService,
  ) {
    this.user = data;
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileType = file.type;
      this.fileToUpload = file;
    }
  }

  directUploadStart(): void {
    if (this.fileToUpload) {
      this.fileUploadService.startUpload(this.fileName, this.fileType).subscribe(response => {
        console.log(response);
        this.directUploadDo(response, this.fileToUpload);
      });
    } else {
      this.alertsService.showErrorMsg('Please pick an image from you drive.', 'No file selected!')
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
        this.dialogRef.close('success');
      });
    });
  }

  updateUserProfilePic(image: FileImage){
    this.user.profile_image = image;
    this.userService.updateUser(this.user).subscribe(userResponse => {
      this.userService.refreshUserData(this.user.id);
    });
  }


}
