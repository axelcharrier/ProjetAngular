import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { UserServices } from '../../../services/user/user-services';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UsersDashboardPage } from '../../../helpers/pages-helper';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-users-update',
  imports: [
    TanStackField,
    FloatLabel,
    InputText,
    InputNumberModule,
    FormsModule,
    ToggleSwitchModule,
    ButtonModule,
    SelectButtonModule,
  ],
  templateUrl: './users-update.html',
})
export class UsersUpdate {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserServices);
  messageService = inject(MessageService);
  user = signal(this.userService.user);
  userMail = String(this.route.snapshot.params['mail']);
  roles: string[] = ['Student', 'Teacher'];

  constructor() {
    this.userService.getUserByMail(this.userMail).subscribe((userResponse) => {
      console.log(userResponse);
      if (userResponse) {
        this.form.setFieldValue('mail', userResponse.mail);
        this.form.setFieldValue('isMailConfirmed', userResponse.isMailConfirmed);
        this.form.setFieldValue('role', userResponse.role);
      }
    });
  }

  form = injectForm({
    defaultValues: {
      mail: this.userMail,
      isMailConfirmed: false,
      role: 'Student',
    },
    onSubmit: async ({ value }) => {
      this.userService
        .modifyUser({
          mail: value.mail,
          isMailConfirmed: value.isMailConfirmed,
          role: value.role,
        })
        .subscribe(() => {
          this.form.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Modified',
          });
          this.router.navigate([UsersDashboardPage.path]);
        });
    },
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }
}
