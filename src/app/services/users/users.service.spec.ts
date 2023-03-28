import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { Account } from 'src/app/models/accounts';
import { PairingGroup } from 'src/app/models/pairing-sessions';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UsersService ]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#postUser', () => {
    it('should return a user object', () => {
      const mockUser: Account = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        is_active: true,
        pairing_session: {id: '1', start_time: '', description: '', title: ''},
        profile_image: { id: 1, file: '', url: '' }
      };

      service.postUser('testUser', 'test@example.com', 'password').subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/accounts/create/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    });
  });

  describe('#getUser', () => {
    it('should return a user object', () => {
      const mockUser: Account = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        is_active: true,
        pairing_session: {id: '1', start_time: '', description: '', title: ''},
        profile_image: { id: 1, file: '', url: '' }
      };

      service.getUser('testUser').subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/accounts/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    });
  });

  describe('#updateUser', () => {
    it('should return a user object', () => {
      const mockUser: Account = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        is_active: true,
        pairing_session: {id: '1', start_time: '', description: '', title: ''},
        profile_image: { id: 1, file: '', url: '' }
      };

      service.updateUser(mockUser).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/accounts/${mockUser.id}/update/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    });
  });

  describe('#loginUser', () => {
    it('should return a token', () => {
      const mockResponse = { access: 'mockToken', refresh: 'mockRefreshToken' };

      service.loginUser('test@example.com', 'password').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/api/token/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('#getUsers', () => {
      it('should get a list of users', () => {
        const mockUsers: Account[] = [
          {
            id: 1,
            username: 'testUser',
            email: 'test@example.com',
            is_active: true,
            pairing_session: {id: '1', start_time: '', description: '', title: ''},
            profile_image: { id: 1, file: '', url: '' }
          },
          {
            id: 2,
            username: 'testUser2',
            email: 'another@example.com',
            is_active: true,
            pairing_session: {id: '2', start_time: '', description: '', title: ''},
            profile_image: { id: 2, file: '', url: '' }
          }
        ];
    
        service.getUsers().subscribe((users: Account[]) => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });
    
        const req = httpMock.expectOne('http://127.0.0.1:8000/accounts/list/');
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers);
      });
  })

  describe('#getUsersByGroup', () => {
      it('should get a list of users by group', () => {
        const mockUsers: Account[] = [
            {
                id: 1,
                username: 'testUser',
                email: 'test@example.com',
                is_active: true,
                pairing_session: {id: '1', start_time: '', description: '', title: ''},
                profile_image: { id: 1, file: '', url: '' }
            },
            {
                id: 2,
                username: 'testUser2',
                email: 'another@example.com',
                is_active: true,
                pairing_session: {id: '2', start_time: '', description: '', title: ''},
                profile_image: { id: 2, file: '', url: '' }
            }
        ];
        const groupName = 'group1';
    
        service.getUsersByGroup(groupName).subscribe((users: Account[]) => {
          expect(users.length).toBe(2);
          expect(users).toEqual(mockUsers);
        });
    
        const req = httpMock.expectOne(`http://127.0.0.1:8000/accounts/list/${groupName}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers);
      });
  })

  describe('getGroups', () => {
      it('should get a list of groups', () => {
        const mockGroups: PairingGroup[] = [
          { id: 1, name: 'group1', createdBy: 'Gencho', ownedBy: 'Mincho' },
          { id: 3, name: 'grupaB', createdBy: 'Gencho', ownedBy: 'Plamen' },
          { id: 534, name: 'vtoraokrujna', createdBy: 'Bobi', ownedBy: 'Pesho' },
        ];
    
        service.getGroups().subscribe((groups: PairingGroup[]) => {
          expect(groups.length).toBe(3);
          expect(groups).toEqual(mockGroups);
        });
    
        const req = httpMock.expectOne('http://127.0.0.1:8000/groups/list/');
        expect(req.request.method).toBe('GET');
        req.flush(mockGroups);
      });
  })

  describe('postGroup', () => {
    it('should send a POST request to create a new group', () => {
      const group: PairingGroup = { id: 1, name: 'group1', createdBy: 'Gencho', ownedBy: 'Mincho' };
      service.postGroup(group).subscribe((response) => {
        expect(response).toEqual(group);
      });

      const req = httpMock.expectOne(`http://127.0.0.1:8000/groups/create/`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(group);
      req.flush(group);
    });
  });

  describe('getActiveUser', () => {
    it('should return the active user from localStorage', () => {
      const user: Account = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        is_active: true,
        pairing_session: {id: '1', start_time: '', description: '', title: ''},
        profile_image: { id: 1, file: '', url: '' }
      };
      const jsonUser = JSON.stringify(user);
      spyOn(localStorage, 'getItem').and.returnValue(jsonUser);
      expect(service.getActiveUser()).toEqual(user);
    });
  });

  describe('postFileData', () => {
    it('should send a POST request to start file upload', () => {
      const name = 'test.txt';
      const type = 'text/plain';
      const response = { message: 'Upload started' };
      service.postFileData(name, type).subscribe((res) => {
        expect(res).toEqual(response);
      });
      const req = httpMock.expectOne(`http://127.0.0.1:8000/api/upload/start/`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ file_name: name, file_type: type });
      req.flush(response);
    });
  });
});