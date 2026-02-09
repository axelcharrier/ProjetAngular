import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Authentification service that handles users
export class Authentification {
  http: HttpClient = inject(HttpClient);
  apiURL = environment.ApiURL;

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.apiURL + '/Authentification/login',
      { email: username, password: password },
      { params: new HttpParams().append('useCookies', 'true'), withCredentials: true },
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(this.apiURL + '/Authentification/register', {
      email: username,
      password: password,
    });
  }

  logout(): Observable<any> {
    return this.http.post(
      this.apiURL + '/Authentification/logout',
      {},
      { withCredentials: true, observe: 'response', responseType: 'text' },
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.apiURL + '/Authentification/manage/info', {
      withCredentials: true,
    });
  }

  // We may add the others services from Api but we don't need them for the moment
}
