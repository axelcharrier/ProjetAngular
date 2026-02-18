import { Component, inject, signal } from '@angular/core';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { CardModule } from 'primeng/card';
import { UserServices } from '../../services/user/user-services';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { AuthenticationServices } from '../../services/authentication/authentication-services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-profile',
  imports: [CardModule, InputText, TanStackField, FloatLabel, Button, Divider],
  templateUrl: './profile.html',
})
export class Profile {
  userService = inject(UserServices);
  authenticationService = inject(AuthenticationServices);
  messageService = inject(MessageService);
  router = inject(Router);
  user = this.userService.user;
  isResetingPassword = false;

  constructor() {
    this.authenticationService.getUserInfo().subscribe((response) => {
      this.user().email.set(response.email);
      this.user().isMailConfirmed.set(response.isMailConfirmed);
      this.user().role.set(response.role);

      if (this.user().email() !== null) {
        this.form.setFieldValue('email', this.user().email() as string);
        this.form.setFieldValue('isMailConfirmed', this.user().isMailConfirmed());
        this.form.setFieldValue('role', this.user().role());
      }

      this.passwordForm.setFieldValue('oldPassword', '');
      this.passwordForm.setFieldValue('newPassword', '');
    });
  }

  form = injectForm({
    defaultValues: {
      email: '',
      isMailConfirmed: false,
      role: '',
    },
    onSubmit: async ({ value }) => {
      if (value.email) {
        this.authenticationService.manageInfo(value.email, null, null).subscribe(() => {
          this.userService.updateUser();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account saved',
          });
        });
      }
    },
  });

  passwordForm = injectForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    onSubmit: async ({ value }) => {
      this.authenticationService.manageInfo(null, value.newPassword, value.oldPassword).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password modified',
          });
          this.passwordForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    },
  });

  handleSubmitForm(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }

  handleSubmitPassword(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.passwordForm.handleSubmit();
  }

  exit() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.userService.updateUser();
      this.router.navigate(['/login']);
    });
  }
}
