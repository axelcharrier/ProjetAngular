import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Eleve } from '../../interfaces/eleve';
import { ElevesServiceMock } from '../../services/eleves-service-mock';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  utilisateurs = signal<Eleve[]>([]);
  ElevesService: ElevesServiceMock = inject(ElevesServiceMock);

  constructor() {
    this.ElevesService.getAllData().subscribe(x => this.utilisateurs.set(x));
  }
}
