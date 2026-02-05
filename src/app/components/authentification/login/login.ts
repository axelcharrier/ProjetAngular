import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { injectForm } from '@tanstack/angular-form';
import { FloatLabel } from "primeng/floatlabel";
import { TanStackField } from '@tanstack/angular-form';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, DividerModule, InputTextModule, FloatLabel, TanStackField, ProgressSpinnerModule, PasswordModule],
  templateUrl: './login.html'
})
export class Login {
  loaderNewStudent = signal(false);
  constructor() { }
  
  toRegister() {
    window.location.href = '/register';
  }

  form = injectForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values.value);
    }
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
