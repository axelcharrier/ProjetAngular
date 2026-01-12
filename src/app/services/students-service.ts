import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  data: Student[] = []

  getAllData(): Student[]
  {
    return []
  }

  addStudent() {
    return
  }

  removeStudent(id: number){
    return
  }
}
