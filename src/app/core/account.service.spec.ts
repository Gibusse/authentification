import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { LocalUserDefinition } from '../shared/model/user';

describe('AccountService', () => {
  let accountService: AccountService;
  let data: LocalUserDefinition;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    data = {
      email: '',
      password:''
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

    const { insertWithAuth } = await accountService.signUp(submitForm);
    expect(201).toEqual(insertWithAuth.status!, 'insert in user table');
  });


  it('Signin service account', async() => {
    const submitForm = {
      ...data,
      email: 'test@test',
      password: '124dadf22558'
    };

    const isExists = await accountService.signInWithSelect(submitForm);
    expect(true).toEqual(isExists, 'exists in user table');
  });
});
