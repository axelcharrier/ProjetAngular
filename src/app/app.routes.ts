import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { ElevesServiceMock } from './services/eleves-service-mock';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home'
    }
];
