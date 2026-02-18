import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { User } from '../../../interfaces/user';
import { UserServices } from '../../../services/user/user-services';
import { Router } from '@angular/router';
import { UserUpdatePage } from '../../../helpers/pages-helper';

@Component({
  selector: 'app-users-dashboard',
  imports: [ButtonModule, TableModule],
  templateUrl: './users-dashboard.html',
})
export class UsersDashboard {
  userService = inject(UserServices);
  router = inject(Router);
  users = signal<User[]>([]);

  constructor() {
    this.userService.getAllUsers().subscribe((response) => {
      return this.users.set(response);
    });
  }

  toUpdate(mail: string) {
    this.router.navigate([UserUpdatePage.buildpath(mail)]);
  }

  delete(mail: string) {
    this.userService.deleteUser(mail).subscribe((mailReturned) => {
      this.users.update((datas) => datas.filter((user) => user.mail != mailReturned));
    });

    return this.users;
  }
}
