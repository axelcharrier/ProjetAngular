import { inject, Injectable, signal } from '@angular/core';
import { AuthenticationServices } from '../authentication/authentication-services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

// This service is used to manage the user, it will be used to get the user info and update the user info
export class UserServices {
  authentication = inject(AuthenticationServices);
  user = signal({
    email: signal<string | null>(null),
    isMailConfirmed: signal<boolean>(false),
    role: signal<string>(''),
  });
  router = inject(Router);

  updateUser() {
    const user = this.authentication.getUserInfo().subscribe({
      next: (response: any) => {
        this.user().email.set(response.email);
        this.user().isMailConfirmed.set(response.isMailConfirmed);
        this.user().role.set(response.role);
      },
    });
    return this.user;
  }
}
