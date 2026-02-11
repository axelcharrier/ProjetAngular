import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// This service is used to manage the authentification of the user, it will be used to login, register, logout and get the user info
export class Authentification {
  http: HttpClient = inject(HttpClient);
  apiURL = environment.ApiURL;

  login(username: string, password: string): Observable<Object> {
    return this.http.post(
      this.apiURL + 'login',
      { email: username, password: password },
      { params: new HttpParams().append('useCookies', 'true'), withCredentials: true },
    );
  }

  register(username: string, password: string): Observable<Object> {
    return this.http.post(this.apiURL + 'register', {
      email: username,
      password: password,
    });
  }

  logout(): Observable<Object> {
    return this.http.post(
      this.apiURL + 'logout',
      {},
      { withCredentials: true, observe: 'response', responseType: 'text' },
    );
  }

  getUserInfo(): Observable<Object> {
    return this.http.get(this.apiURL + 'manage/info', {
      withCredentials: true,
    });
  }

  // We may add the others services from Api but we don't need them for the moment
}
