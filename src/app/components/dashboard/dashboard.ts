import { Component, computed, inject, Signal, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Eleve } from '../../interfaces/eleve';
import { ElevesServiceMock } from '../../services/eleves-service-mock';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumber } from "primeng/inputnumber";

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, ButtonModule, InputTextModule, ReactiveFormsModule, FloatLabelModule, InputNumber],
  templateUrl: './dashboard.html',
})

export class Dashboard {
  utilisateurs = signal<Eleve[]>([]);
  ElevesService: ElevesServiceMock = inject(ElevesServiceMock);

  studentForm = new FormGroup({
    id: new FormControl(),
    nom: new FormControl(''),
    prenom: new FormControl(''),
  })

  
  constructor() {
    this.ElevesService.getAllData().subscribe((x) => this.utilisateurs.set(x));
  }

  submitStudent() {
    if(!this.studentForm.value.id || 
      !this.studentForm.value.nom || this.studentForm.value.nom.trim() === '' ||
      !this.studentForm.value.prenom || this.studentForm.value.prenom.trim() === '')
      return;

    const studentToAdd: Eleve = {
      id: this.studentForm.value.id,
      nom: this.studentForm.value.nom,
      prenom: this.studentForm.value.prenom
    };

    this.ElevesService.addEleve(
      studentToAdd
    );

    this.utilisateurs.update((datas) => ([...datas, studentToAdd]));

    this.studentForm.reset();
  }

  removeStudent(id: number){
    this.ElevesService.removeEleve(id)

    this.utilisateurs.update((datas) => (datas.filter(student => student.id != id)));
  }

  testValues: boolean = false;

  buttonIsDisabled(): boolean{
    this.studentForm.valueChanges.subscribe(test => {
      this.testValues = (test.nom?.trim() !== '' && test.prenom?.trim() !== '' && test.id)
    })
    return !this.testValues
  }
}
