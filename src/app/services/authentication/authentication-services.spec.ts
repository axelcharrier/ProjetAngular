import { TestBed } from '@angular/core/testing';

import { AuthenticationServices } from './authentication-services';
import { AuthenticationServicesMock } from './authentication-services-mock';

describe('Authentication', () => {
  let service: AuthenticationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthenticationServices, useClass: AuthenticationServicesMock }],
    });
    service = TestBed.inject(AuthenticationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
