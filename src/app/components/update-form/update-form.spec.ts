import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForm } from './update-form';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

describe('UpdateForm', () => {
  let component: UpdateForm;
  let fixture: ComponentFixture<UpdateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateForm],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot:{
              params: {'id': 0}
            },
            paramMap: of({ get: (key:string) => (key === 'id' ? '0' : null)})
          }
        }
      ],
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
