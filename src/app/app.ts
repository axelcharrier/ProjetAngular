import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UserServices } from './services/user/user-services';
import { Authentification } from './services/authentication/authentication-services';
import { Router } from '@angular/router';
import { LoginPage } from './helpers/pages-helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ProjetAngular');
  userServices = inject(UserServices);
  authentificationService = inject(Authentification);
  router = inject(Router);

  toProfile() {
    this.router.navigate(['/profile']);
  }
}
