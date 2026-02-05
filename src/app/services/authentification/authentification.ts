import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
  
// Authentification service that handles users
export class Authentification {
  http: HttpClient = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post('/authentification/login', { username, password }, { params: new HttpParams().set('useCookies', 'true') });
  }

  register(username: string, password: string) {
    return this.http.post('/authentification/register', { username, password });
  }

  logout() {
    return this.http.post('/authentification/logout', {}, { withCredentials: true, observe: 'response', responseType: 'text' });
  }

  // We may add the others services from Api but we don't need them for the moment
}
