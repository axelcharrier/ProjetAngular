import { inject, Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  data: Student[] = [];
  http: HttpClient = inject(HttpClient);
  apiURL = environment.ApiURL;

  getAllData(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL + '/students');
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiURL + '/students/' + id);
  }

  addStudent(studentToAdd: Student): Observable<number> {
    return this.http.post<number>(this.apiURL + '/students', {
      lastName: studentToAdd.lastName,
      firstName: studentToAdd.firstName,
    });
  }

  updateStudent(id: number, studentToUpdate: Student): Observable<Student> {
    return this.http.put<Student>(this.apiURL + '/students/' + id, studentToUpdate);
  }

  removeStudent(id: number) {
    console.log(this.apiURL + '/students/' + id);
    return this.http.delete(this.apiURL + '/students/' + id);
  }
}
