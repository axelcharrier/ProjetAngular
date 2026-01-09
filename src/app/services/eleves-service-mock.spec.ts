import { TestBed } from '@angular/core/testing';

import { ElevesServiceMock } from './eleves-service-mock';

describe('ElevesServiceMock', () => {
  let service: ElevesServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevesServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
