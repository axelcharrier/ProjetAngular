import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Eleve } from '../../interfaces/eleve';
import { ElevesServiceMock } from '../../services/eleves-service-mock';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  utilisateurs = signal<Eleve[]>([]);
  ElevesService: ElevesServiceMock = inject(ElevesServiceMock);

  studentForm = new FormGroup({
    id: new FormControl(),
    nom: new FormControl(),
    prenom: new FormControl(),
  })
  
  constructor() {
    this.ElevesService.getAllData().subscribe((x) => this.utilisateurs.set(x));
  }

  submitStudent() {
    const studentToAdd: Eleve = {
      id: this.studentForm.value.id,
      nom: this.studentForm.value.nom,
      prenom: this.studentForm.value.prenom
    };

    this.ElevesService.addEleve(
      studentToAdd
    );

    this.utilisateurs.update((datas) => ([...datas, studentToAdd]));
  }

  removeStudent(id: number){
    this.ElevesService.removeEleve(
      id
    )

    this.utilisateurs.update((datas) => (datas.filter(student => student.id != id)));
  }
}
