import { TestBed } from '@angular/core/testing';

import { Authentification } from './authentification-services';
import { AuthentificationServicesMock } from './authentification-services-mock';

describe('Authentification', () => {
  let service: Authentification;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Authentification, useClass: AuthentificationServicesMock }],
    });
    service = TestBed.inject(Authentification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
