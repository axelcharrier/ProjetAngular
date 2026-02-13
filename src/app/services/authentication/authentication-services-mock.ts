import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServicesMock {
  login(username: string, password: string): Observable<any> {
    return of();
  }

  register(username: string, password: string): Observable<any> {
    return of();
  }

  logout(): Observable<any> {
    return of();
  }

  getUserInfo(): Observable<any> {
    return of({ email: 'userInfo@example.com' });
  }
}
