import { Component, inject, signal } from '@angular/core';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { CardModule } from 'primeng/card';
import { UserServices } from '../../services/user/user-services';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { Authentification } from '../../services/authentification/authentification-services';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CardModule, InputText, TanStackField, FloatLabel, Button],
  templateUrl: './profile.html',
})
export class Profile {
  userService = inject(UserServices);
  authentificationService = inject(Authentification);
  messageService = inject(MessageService);
  location = inject(Location);
  router = inject(Router);
  user = this.userService.user;

  constructor() {
    this.authentificationService.getUserInfo().subscribe((response) => {
      this.user().email.set(response.email);
      this.user().isMailConfirmed.set(response.isMailConfirmed);
      this.user().role.set(response.role);

      console.log(this.user().email());
      if (this.user().email() !== null) {
        this.form.setFieldValue('email', this.user().email() as string);
        this.form.setFieldValue('isMailConfirmed', this.user().isMailConfirmed());
        this.form.setFieldValue('role', this.user().role());
      }
    });
  }

  form = injectForm({
    defaultValues: {
      email: '',
      isMailConfirmed: false,
      role: '',
    },
    onSubmit: async ({ value }) => {
      console.log('before test', value.email);
      if (value.email) {
        console.log(value.email);
        this.authentificationService.manageInfo(value.email, null, null).subscribe(() => {
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

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }

  exit() {
    this.location.back();
  }

  logout() {
    this.authentificationService.logout().subscribe(() => {
      this.userService.updateUser();
      this.router.navigate(['/login']);
    });
  }
}
