import { TestBed } from '@angular/core/testing';

import { AuthentificationServicesMock } from './authentification-services-mock';

describe('AuthentificationServicesMock', () => {
  let service: AuthentificationServicesMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationServicesMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
