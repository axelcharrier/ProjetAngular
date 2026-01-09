import { Injectable, signal } from '@angular/core';
import { Eleve } from '../interfaces/eleve';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElevesServiceMock {
  students = signal<Eleve[]>([
    {
      id: 0,
      nom: "Charrier",
      prenom: "Axel"
    },
    {
      id: 1,
      nom: "Charrier",
      prenom: "Timéo"
    },
    {
      id: 2,
      nom: "Charrier",
      prenom: "Joy"
    },
  ]);

  getAllData() {
    return of(this.students())
  }

  addEleve(student: Eleve) {
    this.students.update((datas) => ([...datas, student]))
  }

  removeEleve(id: number){
    this.students.update((datas) => datas.filter(student => student.id !== id));
  }
}
