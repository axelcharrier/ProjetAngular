import { inject, Injectable } from '@angular/core';
import { Student } from '../../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserServices } from '../user/user-services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  data: Student[] = [];
  http: HttpClient = inject(HttpClient);
  apiURL = environment.ApiURL;
  userServices = inject(UserServices);
  router = inject(Router);

  getAllData(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL + '/students', { withCredentials: true });
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiURL + '/students/' + id, { withCredentials: true });
  }

  addStudent(studentToAdd: Student): Observable<number> {
    return this.http.post<number>(
      this.apiURL + '/students',
      {
        lastName: studentToAdd.lastName,
        firstName: studentToAdd.firstName,
      },
      { withCredentials: true },
    );
  }

  updateStudent(id: number, studentToUpdate: Student): Observable<Student> {
    return this.http.put<Student>(this.apiURL + '/students/' + id, studentToUpdate, {
      withCredentials: true,
    });
  }

  removeStudent(id: number) {
    return this.http.delete(this.apiURL + '/students/' + id, { withCredentials: true });
  }
}
