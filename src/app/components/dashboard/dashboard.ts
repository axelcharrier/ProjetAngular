import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Student } from '../../interfaces/student';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { injectForm } from '@tanstack/angular-form';
import { TanStackField } from '@tanstack/angular-form';
import { StudentsService } from '../../services/students/students-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServices } from '../../services/user/user-services';

@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    TanStackField,
    FormsModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  students = signal<Student[]>([]);
  StudentsService: StudentsService = inject(StudentsService);
  filteredStudents = signal<Student[]>([]);
  router = inject(Router);
  messageService = inject(MessageService);
  testValues: boolean = false;
  loaderStudents = signal(true);
  loaderNewStudent = signal(false);
  userServices = inject(UserServices);

  constructor() {
    this.StudentsService.getAllData()?.subscribe((x) => {
      this.students.set(x);
      this.filteredStudents.set([...this.students()]);
      this.loaderStudents.set(false);
      this.userServices.updateUser();
    });
  }

  disableButton(): boolean {
    if (
      this.form.getFieldValue('firstName')?.trim() === '' ||
      this.form.getFieldValue('lastName')?.trim() === ''
    ) {
      return true;
    }
    return false;
  }

  form = injectForm({
    defaultValues: {
      lastName: '',
      firstName: '',
    },
    onSubmit: async ({ value }) => {
      if (
        !value.lastName ||
        value.lastName.trim() === '' ||
        !value.firstName ||
        value.firstName.trim() === ''
      )
        return;

      this.loaderNewStudent.set(true);
      const studentToAdd = signal<Student>({
        id: undefined,
        lastName: value.lastName,
        firstName: value.firstName,
      });

      this.StudentsService.addStudent(studentToAdd()).subscribe((x) => {
        studentToAdd().id = x;
        this.students.update((datas) => [...datas, studentToAdd()]);
        this.filteredStudents.update((datas) => [...datas, studentToAdd()]);

        this.filterResults('');

        this.form.reset();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Student Created',
        });

        this.loaderNewStudent.set(false);
      });
    },
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredStudents.set([...this.students()]);
      return;
    }

    this.filteredStudents.set([
      ...this.students().filter((x) => x.firstName.toLowerCase().includes(text.toLowerCase())),
    ]);
  }

  removeStudent(id: number) {
    this.StudentsService.removeStudent(id).subscribe((bool) => {
      this.students.update((datas) => datas.filter((student) => student.id != id));
      this.filteredStudents.update((datas) => datas.filter((student) => student.id != id));
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Student deleted',
      });
    });
  }

  toUpdatePage(id: number) {
    this.router.navigate(['/update', id]);
  }
}
