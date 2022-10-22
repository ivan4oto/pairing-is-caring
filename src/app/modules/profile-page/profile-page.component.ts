import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  fileName = '';
  fileType = '';
  fileToUpload!: File;

  constructor(
    private userService: UsersService,
    private fileUploadService: FileUploadService
  ) { }

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
    this.userService.postFileData(this.fileName, this.fileType).subscribe(response => {
      console.log(response);
      this.directUploadDo(response, this.fileToUpload);
    });
  }

  directUploadDo(data: any, file: File): void {
    this.fileUploadService.uploadFileToS3(data, file).subscribe(uploadResponse => {
      console.log(uploadResponse);
    });
  }

}
