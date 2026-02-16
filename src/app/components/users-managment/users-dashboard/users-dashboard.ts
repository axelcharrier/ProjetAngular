import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { User } from '../../../interfaces/user';
import { UserServices } from '../../../services/user/user-services';

@Component({
  selector: 'app-users-dashboard',
  imports: [ButtonModule, TableModule],
  templateUrl: './users-dashboard.html',
})
export class UsersDashboard {
  userService = inject(UserServices);
  users = signal<User[]>([]);

  constructor() {
    this.userService.getAllUsers().subscribe((response) => {
      return this.users.set(response);
    });
  }
}
