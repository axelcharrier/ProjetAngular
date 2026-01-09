import { Injectable } from '@angular/core';
import { Eleve } from '../interfaces/eleve';

@Injectable({
  providedIn: 'root',
})
export class ElevesService {
  data: Eleve[] = []

  getAllData(): Eleve[]
  {
    return []
  }
}
