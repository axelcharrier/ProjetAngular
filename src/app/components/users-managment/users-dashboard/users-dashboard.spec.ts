import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDashboard } from './users-dashboard';
import { UserServices } from '../../../services/user/user-services';
import { UserServicesMock } from '../../../services/user/user-services-mock';

describe('UsersDashboard', () => {
  let component: UsersDashboard;
  let fixture: ComponentFixture<UsersDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDashboard],
      providers: [{ provide: UserServices, useClass: UserServicesMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
