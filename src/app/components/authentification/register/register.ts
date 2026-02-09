import { Component, inject, signal } from '@angular/core';
import { injectForm } from '@tanstack/angular-form';
import { FloatLabel } from 'primeng/floatlabel';
import { TanStackField } from '@tanstack/angular-form';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Authentification } from '../../../services/authentification/authentification-services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FloatLabel,
    TanStackField,
    ProgressSpinnerModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './register.html',
})
export class Register {
  loader = signal(false);
  authentificationService = inject(Authentification);
  messageService = inject(MessageService);
  router = inject(Router);

  constructor() {}

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

      this.loader.set(true);

      this.authentificationService.register(value.email, value.password).subscribe({
        next: () => {
          this.authentificationService.login(value.email, value.password).subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error during login, please try to login manually.',
              });
              this.router.navigate(['/login']);
              this.loader.set(false);
            },
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error during registration, please try again.',
          });
          this.loader.set(false);
        },
      });
      this.form.reset();
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
