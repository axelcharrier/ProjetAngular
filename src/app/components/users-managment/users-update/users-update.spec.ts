import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUpdate } from './users-update';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { UserServices } from '../../../services/user/user-services';
import { UserServicesMock } from '../../../services/user/user-services-mock';

describe('UsersUpdate', () => {
  let component: UsersUpdate;
  let fixture: ComponentFixture<UsersUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUpdate],
      providers: [
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { mail: 'acharrier56@icloud.com' },
            },
            paramMap: of({ get: (key: string) => (key === 'mail' ? '0' : null) }),
          },
        },
        { provide: UserServices, useClass: UserServicesMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
