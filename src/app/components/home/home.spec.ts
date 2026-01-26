import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { MessageService } from 'primeng/api';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import { StudentsServiceMock } from '../../services/students-service-mock';
import { StudentsService } from '../../services/students-service';


describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: StudentsService, useClass: StudentsServiceMock },
        MessageService,
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
