import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Student } from '../../interfaces/student';
import { StudentsServiceMock } from '../../services/students-service-mock';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumber } from "primeng/inputnumber";
import { Router } from '@angular/router';
import { injectForm } from '@tanstack/angular-form';
import { TanStackField } from '@tanstack/angular-form';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, ButtonModule, InputTextModule, ReactiveFormsModule, FloatLabelModule, InputNumber, TanStackField, FormsModule],
  templateUrl: './dashboard.html',
})



export class Dashboard {
  students = signal<Student[]>([]);
  StudentsService: StudentsServiceMock = inject(StudentsServiceMock);
  filteredStudents = signal<Student[]>([]);
  router = inject(Router)
  testValues: boolean = false;

  studentForm = new FormGroup({
    id: new FormControl(),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
  })

  
  constructor() {
    this.StudentsService.getAllData().subscribe((x) => this.students.set(x));
    this.filteredStudents.set([...this.students()]);
    this.form.setFieldValue("id", this.students().length)
  }

  form = injectForm({
    defaultValues: {
      id: this.students().length,
      lastName: '',
      firstName: ''
    }, 
    onSubmit: async ({value}) => {
      if(value.id === null && value.id === undefined ||
      !value.lastName || value.lastName.trim() === '' ||
      !value.firstName || value.firstName.trim() === '')
        return;

      const studentToAdd: Student = {
        id: value.id,
        lastName: value.lastName,
        firstName: value.firstName,
      }

      this.students.update((datas) => ([...datas, studentToAdd]));
      this.filteredStudents.update((datas) => ([...datas, studentToAdd]))
      this.filterResults('');

      this.form.reset();
      this.form.setFieldValue('id', this.students().length)
    }
  })

  handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.form.handleSubmit()
  }

  filterResults(text: string) {
    if (!text)
    {
      this.filteredStudents.set([...this.students()]);
      return
    }

    this.filteredStudents.set([...this.filteredStudents().filter(x => x.firstName.toLowerCase().includes(text.toLowerCase()))])
  }

  removeStudent(id: number){
    this.students.update((datas) => (datas.filter(student => student.id != id)));
    this.filteredStudents.update((datas) => (datas.filter(student => student.id != id)))
    this.StudentsService.removeStudent(id)
    this.form.setFieldValue('id', this.students().length)

  }

  buttonIsDisabled(): boolean{
    this.studentForm.valueChanges.subscribe(test => {
      this.testValues = (test.lastName?.trim() !== '' && test.firstName?.trim() !== '' && test.id)
    })
    return !this.testValues
  }

  toUpdatePage(id: number){
    this.router.navigate(['/update', id])
  }
}