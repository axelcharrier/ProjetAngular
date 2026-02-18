import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';
import { MessageService } from 'primeng/api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationServicesMock } from '../../services/authentication/authentication-services-mock';
import { AuthenticationServices } from '../../services/authentication/authentication-services';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [
        MessageService,
        provideHttpClientTesting,
        { provide: AuthenticationServices, useClass: AuthenticationServicesMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
