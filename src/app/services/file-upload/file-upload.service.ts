import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://127.0.0.1:8000';
  constructor(
    private httpService: HttpClient,
  ) {}


  public uploadFileToS3(data: any, file: File): Observable<Object> {
    let formData:FormData = new FormData();
    for (const key in data?.fields) {
        formData.append(key, data.fields[key]);
      }
    let postParams = {};
    formData.append('file', file, file.name);
    return this.httpService.post(data.url, formData, postParams);
  }
}
