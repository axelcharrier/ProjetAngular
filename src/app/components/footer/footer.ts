import { Component, inject } from '@angular/core';
import { UserServices } from '../../services/user/user-services';
import { AuthenticationServices } from '../../services/authentication/authentication-services';
import { Router } from '@angular/router';
import { ProfilePage } from '../../helpers/pages-helper';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-footer',
  imports: [Button],
  templateUrl: './footer.html',
})
export class Footer {
  userServices = inject(UserServices);
  authenticationService = inject(AuthenticationServices);
  router = inject(Router);

  toProfile() {
    this.router.navigate([ProfilePage.path]);
  }
}
