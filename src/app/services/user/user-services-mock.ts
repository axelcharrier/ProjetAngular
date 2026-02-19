import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServicesMock {
  updateUser() {
    return of({ email: 'test@test.com', isMailConfirmed: true, role: 'Teacher' });
  }

  getAllUsers() {
    return of([{ email: 'test@test.com', isMailConfirmed: true, role: 'Teacher' }]);
  }

  getUserByMail(mail: string) {
    return of({ email: mail, isMailConfirmed: true, role: 'Teacher' });
  }

  modifyUser() {
    return of({ email: 'test@test.com', isMailConfirmed: true, role: 'Teacher' });
  }

  deleteUser(mail: string) {
    return of('test@test.com');
  }
}
