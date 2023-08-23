import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { LocalUserDefinition } from '../shared/model/user';
import { LoginResponse } from '../shared/model/loginResponse';

describe('AccountService', () => {
  let accountService: AccountService;
  let data: LocalUserDefinition;
  let loginResponse : LoginResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });
    accountService = TestBed.inject(AccountService);
    data = {
      email: '',
      password:''
    };
    loginResponse = {
      insertWithAuth: {},
      signUpWithAuth:{}
    };
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  it('Signup service account', async() => {
    const submitForm = {
      ...data,
      email: 'test@test',
      password: '124dadf22558'
    };
    loginResponse = {
      insertWithAuth: {
        status: 201
      },
      signUpWithAuth:{
        data: {
          email:'test@test',
          password: '124dadf22558'
        }
      }
    };
    const { insertWithAuth } = await accountService.signUp(submitForm);
    expect(201).toEqual(insertWithAuth.status!, 'insert in user table');
  });
});
