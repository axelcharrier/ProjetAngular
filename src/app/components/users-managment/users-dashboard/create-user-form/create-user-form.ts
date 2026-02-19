import { Component } from '@angular/core';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-user-form',
  imports: [FloatLabel, TanStackField, InputText, FormsModule, Select, ButtonModule],
  templateUrl: './create-user-form.html',
})
export class CreateUserForm {
  roles: string[] = ['Student', 'Teacher'];

  form = injectForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      role: '',
    },
    onSubmit: ({ value }) => {},
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }
}
