import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForm } from './update-form';

describe('UpdateForm', () => {
  let component: UpdateForm;
  let fixture: ComponentFixture<UpdateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
