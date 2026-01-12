import { TestBed } from '@angular/core/testing';

import { StudentsServiceMock } from './students-service-mock';

describe('ElevesServiceMock', () => {
  let service: StudentsServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
