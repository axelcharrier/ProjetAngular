import { TestBed } from '@angular/core/testing';

import { StudentsService } from './students-service';
import { StudentsServiceMock } from './students-service-mock';

describe('ElevesService', () => {
  let service: StudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StudentsService, useClass: StudentsServiceMock },],
    });
    service = TestBed.inject(StudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
