import { inject, Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  data: Student[] = [];
  http: HttpClient = inject(HttpClient);
  apiURL = environment.ApiURL;

  getAllData(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiURL + '/' + id);
  }

  addStudent(studentToAdd: Student): Observable<number> {
    return this.http.post<number>(this.apiURL, {
      lastName: studentToAdd.lastName,
      firstName: studentToAdd.firstName,
    });
  }

  updateStudent(studentToUpdate: Student): Observable<Student> {
    return this.http.put<Student>(this.apiURL + '/', studentToUpdate);
  }

  removeStudent(id: number) {
    console.log(this.apiURL + '/' + id);
    return this.http.delete(this.apiURL + '/' + id);
  }
}
