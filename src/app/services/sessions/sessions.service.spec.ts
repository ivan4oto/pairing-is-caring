import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionsService } from './sessions.service';
import { PairingSession } from 'src/app/models/pairing-sessions';
import { Account } from 'src/app/models/accounts';

describe('SessionsService', () => {
  let service: SessionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionsService]
    });
    service = TestBed.inject(SessionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should update a session', () => {
    const session: PairingSession = {id: '1', start_time: '2023-03-28T14:55:00', description: 'BlaBla', title: 'Title'};
    service.updateSession(session).subscribe((response) => {
      expect(response).toEqual(session);
    });
    const request = httpMock.expectOne(`http://127.0.0.1:8000/sessions/${session.id}/update/`);
    expect(request.request.method).toBe('PUT');
    request.flush(session);
  });

  it('should get a list of sessions', () => {
    const sessions: PairingSession[] = [
      {id: '1', start_time: '2023-03-28T14:55:00', description: 'BlaBla', title: 'Title'},
      {id: '2', start_time: '2023-03-29T10:30:00', description: 'Description', title: 'AnotherTitle'}
    ];
    service.getSessions().subscribe((response) => {
      expect(response).toEqual(sessions);
    });
    const request = httpMock.expectOne(`http://127.0.0.1:8000/sessions/list/`);
    expect(request.request.method).toBe('GET');
    request.flush(sessions);
  });

  it('should create a new session', () => {
    const startTime = '2023-03-28T14:55:00';
    const session: PairingSession = {id: '1', start_time: startTime, description: 'BlaBla', title: 'Title'};
    service.createNewSession(startTime).subscribe((response) => {
      expect(response).toEqual(session);
    });
    const request = httpMock.expectOne(`http://127.0.0.1:8000/sessions/create/`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ start_time: startTime });
    request.flush(session);
  });
  
  it('should return an array of Account objects for a given session ID', () => {
    const sessionId = '123';
    const expectedUsers: Account[] = [
      { 
        id: 1, 
        pairing_session: { 
          id: '456', 
          start_time: '2022-04-01T09:00:00Z', 
          description: 'Pair programming session', 
          title: 'Pair Programming' 
        },
        pairing_group: { 
          id: 789, 
          name: 'Pair Programming Group', 
          createdBy: 'Sasho', 
          ownedBy: 'Sasho' 
        },
        username: 'simong',
        email: 'simong@gengsta.com',
        is_active: true,
        profile_image: { 
          id: 10, 
          file: 'profile.jpg', 
          url: 'https://example.com/profile.jpg' 
        }
      },
      { 
        id: 2, 
        pairing_session: { 
          id: '456', 
          start_time: '2022-04-01T09:00:00Z', 
          description: 'Pair programming session', 
          title: 'Pair Programming' 
        },
        pairing_group: { 
          id: 789, 
          name: 'Pair Programming Group', 
          createdBy: 'Ivan', 
          ownedBy: 'Gosho' 
        },
        username: 'tovarniqvlak',
        email: 'nesebop@mvr.com',
        is_active: true,
        profile_image: { 
          id: 11, 
          file: 'profile.jpg', 
          url: 'https://example.com/profile.jpg' 
        }
      }
    ];
  
    service.getUsersInSession(sessionId).subscribe(users => {
      expect(users).toEqual(expectedUsers);
    });
  
    const req = httpMock.expectOne(`http://127.0.0.1:8000/sessions/get-users/${sessionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedUsers);
  });
});