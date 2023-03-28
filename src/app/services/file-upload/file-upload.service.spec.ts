import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileUploadService } from './file-upload.service';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileUploadService]
    });
    service = TestBed.inject(FileUploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should upload file to S3', () => {
    const data = {url: 'test-url', fields: {test_field: 'test_value'}};
    const file = new File([], 'test.txt');
    const expectedResponse = {status: 'success'};

    service.uploadFileToS3(data, file).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(data.url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.get('test_field')).toEqual('test_value');
    expect(req.request.body.get('file')).toEqual(file);
    req.flush(expectedResponse);
  });

  it('should start upload', () => {
    const expectedResponse = {status: 'success'};
    const fileName = 'test.txt';
    const fileType = 'text/plain';

    service.startUpload(fileName, fileType).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/api/upload/start/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.file_name).toEqual(fileName);
    expect(req.request.body.file_type).toEqual(fileType);
    req.flush(expectedResponse);
  });

  it('should finish upload', () => {
    const expectedResponse = {id: 123, file: 'testimage', url: 'http://test.url'};
    const fileId = '123';

    service.finishUpload(fileId).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/api/upload/finish/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.file_id).toEqual(fileId);
    req.flush(expectedResponse);
  });
});