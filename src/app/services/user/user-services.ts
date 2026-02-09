import { inject, Injectable, signal } from '@angular/core';
import { Authentification } from '../authentification/authentification-services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  authentification = inject(Authentification);
  user = signal('');
  router = inject(Router);

  updateUser() {
    const user = this.authentification.getUserInfo().subscribe({
      next: (response) => {
        this.user.set(response.email);
        console.log('reponse : ', response);
        console.log('user : ', this.user());
      },
    });
    return this.user;
  }
}
