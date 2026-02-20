import { Component, inject } from '@angular/core';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { AuthenticationServices } from '../../../../services/authentication/authentication-services';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-create-user-form',
  imports: [
    FloatLabel,
    TanStackField,
    InputText,
    FormsModule,
    Select,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './create-user-form.html',
})
export class CreateUserForm {
  authenticationServices = inject(AuthenticationServices);
  messageServices = inject(MessageService);
  roles: string[] = ['Student', 'Teacher'];

  form = injectForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      role: '',
    },
    onSubmit: async ({ value }) => {
      // We test if the two passwords are the same
      // We send the request
      // If it success, we clear
      // Else we do not clean nothing

      if (value.password === value.passwordConfirmation) {
        if (this.disableButton()) {
          this.messageServices.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'All fields must be filled',
          });
          return;
        }

        this.authenticationServices.register(value.email, value.password, value.role).subscribe({
          next: () => {
            this.messageServices.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User well registered',
            });
            this.form.resetField('email');
          },
          error: () => {
            this.messageServices.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error during registration',
            });
          },
        });
      } else {
        this.messageServices.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Password and password confirmation must be the same',
        });
      }
    },
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }

  disableButton(): boolean {
    if (
      this.form.getFieldValue('password')?.trim() === '' ||
      this.form.getFieldValue('email')?.trim() === '' ||
      this.form.getFieldValue('role')?.trim() === '' ||
      this.form.getFieldValue('passwordConfirmation')?.trim() === ''
    ) {
      return true;
    }
    return false;
  }
}
