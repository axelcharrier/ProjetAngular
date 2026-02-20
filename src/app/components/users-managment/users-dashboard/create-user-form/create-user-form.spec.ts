import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserForm } from './create-user-form';
import { MessageService } from 'primeng/api';

describe('CreateUserForm', () => {
  let component: CreateUserForm;
  let fixture: ComponentFixture<CreateUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserForm],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
