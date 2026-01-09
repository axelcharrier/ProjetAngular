import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Eleve } from '../../interfaces/eleve';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  utilisateur: Eleve = {
    id: 0,
    nom: 'Charrier',
    prenom: "Axel"
  }
}
