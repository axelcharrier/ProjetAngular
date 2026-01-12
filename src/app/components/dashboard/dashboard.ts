import { Component, computed, inject, Signal, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Student } from '../../interfaces/student';
import { StudentsServiceMock } from '../../services/students-service-mock';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumber } from "primeng/inputnumber";

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, ButtonModule, InputTextModule, ReactiveFormsModule, FloatLabelModule, InputNumber],
  templateUrl: './dashboard.html',
})

export class Dashboard {
  students = signal<Student[]>([]);
  StudentsService: StudentsServiceMock = inject(StudentsServiceMock);

  studentForm = new FormGroup({
    id: new FormControl(),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
  })

  
  constructor() {
    this.StudentsService.getAllData().subscribe((x) => this.students.set(x));
  }

  submitStudent() {
    if(!this.studentForm.value.id || 
      !this.studentForm.value.lastName || this.studentForm.value.lastName.trim() === '' ||
      !this.studentForm.value.firstName || this.studentForm.value.firstName.trim() === '')
      return;

    const studentToAdd: Student = {
      id: this.studentForm.value.id,
      lastName: this.studentForm.value.lastName,
      firstName: this.studentForm.value.firstName
    };

    this.StudentsService.addStudent(
      studentToAdd
    );

    this.students.update((datas) => ([...datas, studentToAdd]));

    this.studentForm.reset();
  }

  removeStudent(id: number){
    this.students.update((datas) => (datas.filter(student => student.id != id)));
    this.StudentsService.removeStudent(id)
  }

  testValues: boolean = false;

  buttonIsDisabled(): boolean{
    this.studentForm.valueChanges.subscribe(test => {
      this.testValues = (test.lastName?.trim() !== '' && test.firstName?.trim() !== '' && test.id)
    })
    return !this.testValues
  }
}
