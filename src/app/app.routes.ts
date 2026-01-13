import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { StudentsServiceMock } from './services/students-service-mock';
import { updatePreset } from '@primeuix/themes';
import { UpdateForm } from './components/update-form/update-form';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home'
    },
    {
        path: 'update/:id',
        component: UpdateForm,
        title: 'Update Student'
    }
];
