import { inject, Injectable, signal } from '@angular/core';
import { AuthenticationServices } from '../authentication/authentication-services';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

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
  apiUrl = environment.ApiURL;
  http: HttpClient = inject(HttpClient);

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

  getAllUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.apiUrl + '/users', {
      withCredentials: true,
    });
    return users;
  }

  getUserByMail(mail: string): Observable<User> {
    const user = this.http.get<User>(this.apiUrl + '/users/bymail', {
      params: {
        mail: mail,
      },
      withCredentials: true,
    });
    return user;
  }

  modifyUser(user: User): Observable<User> {
    const userResponse = this.http.put<User>(this.apiUrl + '/users', user, {
      withCredentials: true,
    });
    return userResponse;
  }
}
