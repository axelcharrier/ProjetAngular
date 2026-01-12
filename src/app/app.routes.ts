import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { StudentsServiceMock } from './services/students-service-mock';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home'
    }
];
