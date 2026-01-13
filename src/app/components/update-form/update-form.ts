import { Component, inject, signal} from '@angular/core';
import { Student } from '../../interfaces/student';
import { StudentsServiceMock } from '../../services/students-service-mock';
import { ActivatedRoute, RedirectCommand, RouterLink } from '@angular/router';
import { FloatLabel } from "primeng/floatlabel";
import { InputText } from "primeng/inputtext";
import { InputNumber } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-update-form',
  imports: [FloatLabel, InputText, InputNumber, ReactiveFormsModule, ButtonModule],
  templateUrl: './update-form.html',
  styleUrl: './update-form.scss',
})

export class UpdateForm {
  route: ActivatedRoute = inject(ActivatedRoute);
  student = signal<Student[]>([]);
  studentService = inject(StudentsServiceMock);
  router = inject(Router)

  studentForm = new FormGroup({
    id: new FormControl(),
    lastName: new FormControl("Test"),
    firstName: new FormControl("Test")
  })
  

  constructor()
  {
    const studentId = Number(this.route.snapshot.params['id']);
    this.studentService.getById(studentId).subscribe((x) => this.student.set(x))

    this.studentForm.setValue({
      id: this.student()[0].id, 
      lastName: this.student()[0].lastName, 
      firstName: this.student()[0].firstName});
  }

  submitForm(){
    if(this.studentForm.value.id === null && this.studentForm.value.id === undefined ||
      !this.studentForm.value.lastName || this.studentForm.value.lastName.trim() === '' ||
      !this.studentForm.value.firstName || this.studentForm.value.firstName.trim() === '')
      return;

    const studentToAdd: Student = {
      id: this.studentForm.value.id,
      lastName: this.studentForm.value.lastName,
      firstName: this.studentForm.value.firstName,
    }

    this.studentService.updateStudent(studentToAdd)
    
    this.router.navigate([''])

    return
  }
  
}
