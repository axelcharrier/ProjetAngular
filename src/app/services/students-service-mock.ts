import { Injectable, signal } from '@angular/core';
import { Student } from '../interfaces/student';
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

  addStudent(student: Student) {
    this.students.update((datas) => ([...datas, student]))
  }

  removeStudent(id: number){
    this.students.update((datas) => datas.filter(student => student.id !== id));
  }
}
