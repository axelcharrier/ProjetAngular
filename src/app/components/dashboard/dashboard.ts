import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  utilisateur = {
    "nom": 'Charrier',
    "prenom": "Axel"
  }
}
