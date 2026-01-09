import { TestBed } from '@angular/core/testing';

import { ElevesService } from './eleves-service';

describe('ElevesService', () => {
  let service: ElevesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
