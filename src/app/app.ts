import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UserServices } from './services/user/user-services';
import { AuthenticationServices } from './services/authentication/authentication-services';
import { Router, Route } from '@angular/router';
import { ProfilePage } from './helpers/pages-helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ProjetAngular');
  userServices = inject(UserServices);
  authenticationService = inject(AuthenticationServices);
  router = inject(Router);

  toProfile() {
    this.router.navigate([ProfilePage.path]);
  }
}
