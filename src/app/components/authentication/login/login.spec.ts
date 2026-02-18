import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { MessageService } from 'primeng/api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationServices } from '../../../services/authentication/authentication-services';
import { AuthenticationServicesMock } from '../../../services/authentication/authentication-services-mock';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        MessageService,
        provideHttpClientTesting(),
        { provide: AuthenticationServices, useClass: AuthenticationServicesMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
