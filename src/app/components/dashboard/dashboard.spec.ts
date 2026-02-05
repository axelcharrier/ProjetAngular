import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { MessageService } from 'primeng/api';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import { StudentsService } from '../../services/students/students-service';
import { StudentsServiceMock } from '../../services/students/students-service-mock';



describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        MessageService,
        provideHttpClientTesting(),
        { provide: StudentsService, useClass: StudentsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
