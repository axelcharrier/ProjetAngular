import { Routes } from '@angular/router';
import { HomePage } from './helpers/pages-helper';
import { UpdateForm } from './components/update-form/update-form';
import { Register } from './components/authentification/register/register';
import { Login } from './components/authentification/login/login';

export const routes: Routes = [
  HomePage,
  {
    path: 'update/:id',
    component: UpdateForm,
    title: 'Update Student',
  },
  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
];
