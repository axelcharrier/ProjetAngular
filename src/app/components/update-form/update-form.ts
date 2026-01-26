import { Component, inject, signal} from '@angular/core';
import { Student } from '../../interfaces/student';
import { ActivatedRoute } from '@angular/router';
import { FloatLabel } from "primeng/floatlabel";
import { InputText } from "primeng/inputtext";
import { InputNumber } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { TanStackField, injectForm } from '@tanstack/angular-form'
import { StudentsService } from '../../services/students-service';


@Component({
  selector: 'app-update-form',
  imports: [FloatLabel, InputText, InputNumber, ReactiveFormsModule, ButtonModule, TanStackField, FormsModule],
  templateUrl: './update-form.html',
})

export class UpdateForm {
  route: ActivatedRoute = inject(ActivatedRoute);
  student = signal<Student | null>(null);
  studentService = inject(StudentsService);
  router = inject(Router)

  constructor()
  {
    const studentId = Number(this.route.snapshot.params['id']);
    this.studentService.getById(studentId).subscribe((x) => {
      this.student.set(x);
      const currentStudent = this.student()
      if (currentStudent){
        this.form.setFieldValue("id", currentStudent.id)
        this.form.setFieldValue("lastName", currentStudent.lastName)
        this.form.setFieldValue("firstName", currentStudent.firstName)
      }
    });

  }

  form = injectForm({
    defaultValues: {
      id: this.student()?.id,
      firstName: this.student()?.firstName,
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      if(value.id === null && value.id === undefined ||
      !value.lastName || value.lastName.trim() === '' ||
      !value.firstName || value.firstName.trim() === '')
        return;

      const studentToAdd: Student = {
        id: value.id,
        lastName: value.lastName,
        firstName: value.firstName,
      }

      this.studentService.updateStudent(studentToAdd).subscribe(() => {
        this.router.navigate([''])
      });
    },
  })


  handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.form.handleSubmit()
  }
  
}
