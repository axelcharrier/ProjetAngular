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

  getAllData(): Observable<Student[]>
  {
    return this.http.get<Student[]>(this.apiURL + "/Student");
  }

  getById(id: number): Observable<Student>
  {
    return this.http.get<Student>(this.apiURL + "/Student/" + id);
  }

  addStudent(studentToAdd: Student): Observable<number> {
    return this.http.post<number>(this.apiURL + "/Student", 
      ({
        lastName: studentToAdd.lastName,
        firstName: studentToAdd.firstName
      })
    )
  }

  updateStudent(studentToUpdate: Student): Observable<Student> {
    return this.http.put<Student>(this.apiURL + "/Student", studentToUpdate)
  }

  removeStudent(id: number){
    console.log(this.apiURL +"/Student/" + id);
    return this.http.delete(this.apiURL +"/Student/" + id);
  }
}
