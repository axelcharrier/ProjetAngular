import { Component, signal } from '@angular/core';
import { injectForm } from '@tanstack/angular-form';
import { FloatLabel } from "primeng/floatlabel";
import { TanStackField } from '@tanstack/angular-form';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [FloatLabel, TanStackField, ProgressSpinnerModule, PasswordModule, ButtonModule, InputTextModule],
  templateUrl: './register.html'
})
export class Register {
  loaderNewStudent = signal(false);

  constructor() {}
  
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
