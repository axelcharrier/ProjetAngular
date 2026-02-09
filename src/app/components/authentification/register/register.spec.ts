import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { MessageService } from 'primeng/api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Authentification } from '../../../services/authentification/authentification-services';
import { AuthentificationServicesMock } from '../../../services/authentification/authentification-services-mock';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        MessageService,
        provideHttpClientTesting(),
        { provide: Authentification, useClass: AuthentificationServicesMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
