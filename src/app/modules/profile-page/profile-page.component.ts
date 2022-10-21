import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  fileName = '';
  fileType = '';

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileType = file.type;
      // const formData = new FormData();
      // formData.append("thumbnail", file);
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      // upload$.subscribe();
    }
  }
  
  submitFile(): void {
    this.userService.postFileData(this.fileName, this.fileType).subscribe(response => {
      console.log(response);
    });
    
  }

}
