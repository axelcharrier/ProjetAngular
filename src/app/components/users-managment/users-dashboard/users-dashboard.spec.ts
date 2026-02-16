import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDashboard } from './users-dashboard';

describe('UsersDashboard', () => {
  let component: UsersDashboard;
  let fixture: ComponentFixture<UsersDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
