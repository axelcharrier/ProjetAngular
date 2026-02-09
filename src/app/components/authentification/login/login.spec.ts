import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { MessageService } from 'primeng/api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Authentification } from '../../../services/authentification/authentification-services';
import { AuthentificationServicesMock } from '../../../services/authentification/authentification-services-mock';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        MessageService,
        provideHttpClientTesting(),
        { provide: Authentification, useClass: AuthentificationServicesMock },
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
