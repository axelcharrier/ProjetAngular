import { Injectable, signal } from '@angular/core';
import { Student } from '../../interfaces/student';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class StudentsServiceMock {
  students = signal<Student[]>([
    {
      id: 0,
      lastName: "Charrier",
      firstName: "Axel"
    },
    {
      id: 1,
      lastName: "Charrier",
      firstName: "Timéo"
    },
    {
      id: 2,
      lastName: "Charrier",
      firstName: "Joy"
    },
  ]);

  getAllData() {
    return of(this.students())
  }

  getById(id: number) {
    return of(this.students().filter(x => x.id === id))
  }

  addStudent(student: Student) {
    this.students.update((datas) => ([...datas, student]))
  }

  updateStudent(student: Student){
    const studentToUpdate = this.students().find((stu)=>stu.id === student.id);

    if (!studentToUpdate)
      return

    studentToUpdate.lastName = student.lastName;
    studentToUpdate.firstName = student.firstName;

  }

  removeStudent(id: number){
    this.students.update((datas) => datas.filter(student => student.id !== id));
  }
}
