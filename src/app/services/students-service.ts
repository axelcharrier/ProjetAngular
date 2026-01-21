import { inject, Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  data: Student[] = [];
  http: HttpClient = inject(HttpClient);
  apiURL = environment.ApiURL;

  getAllData(): Student[]
  {
    return []
  }

  getById(id: number)
  {
    return
  }

  addStudent() {
    return
  }

  removeStudent(id: number){
    return
  }
}
