import { Component, inject, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { injectForm } from '@tanstack/angular-form';
import { FloatLabel } from 'primeng/floatlabel';
import { TanStackField } from '@tanstack/angular-form';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Authentification } from '../../../services/authentification/authentification';
import { MessageService } from 'primeng/api';

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
  constructor() {}

  toRegister() {
    window.location.href = '/register';
  }

  form = injectForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      if (
        !value.email ||
        value.email.trim() === '' ||
        !value.password ||
        value.password.trim() === ''
      )
        return;

      this.form.reset();

      this.loaderNewStudent.set(true);

      this.authentificationService.login(value.email, value.password).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.loaderNewStudent.set(false);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error during login, please try again.',
          });
          this.router.navigate(['/login']);
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
    if (
      this.form.getFieldValue('email')?.trim() === '' ||
      this.form.getFieldValue('password')?.trim() === ''
    ) {
      return true;
    }
    return false;
  }
}
