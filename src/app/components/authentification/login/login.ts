import { Component, inject, signal, computed } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { injectForm } from '@tanstack/angular-form';
import { FloatLabel } from 'primeng/floatlabel';
import { TanStackField } from '@tanstack/angular-form';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Authentification } from '../../../services/authentification/authentification-services';
import { MessageService } from 'primeng/api';
import { UserServices } from '../../../services/user/user-services';
import { LoginPage } from '../../../helpers/pages-helper';
import { HomePage } from '../../../helpers/pages-helper';
import { RegisterPage } from '../../../helpers/pages-helper';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    FloatLabel,
    TanStackField,
    ProgressSpinnerModule,
    PasswordModule,
  ],
  templateUrl: './login.html',
})
export class Login {
  loaderNewStudent = signal(false);
  router = inject(Router);
  authentificationService = inject(Authentification);
  messageService = inject(MessageService);
  userServices = inject(UserServices);

  toRegister() {
    this.router.navigate([RegisterPage.path]);
  }

  form = injectForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const isValid =
        !value.email ||
        value.email.trim() === '' ||
        !value.password ||
        value.password.trim() === '';
      if (isValid) return;

      this.form.reset();

      this.loaderNewStudent.set(true);

      this.authentificationService.login(value.email, value.password).subscribe({
        next: () => {
          this.userServices.updateUser();
          this.router.navigate([HomePage.path]);
          this.loaderNewStudent.set(false);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error during login, please try again.',
          });
          this.router.navigate([LoginPage.path]);
          this.loaderNewStudent.set(false);
        },
      });
    },
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }

  disableButton(): boolean {
    return (
      this.form.getFieldValue('email')?.trim() === '' ||
      this.form.getFieldValue('password')?.trim() === ''
    );
  }
}
