import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { UpdateForm } from './components/update-form/update-form';
import { Register } from './components/authentification/register/register';
import { Login } from './components/authentification/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
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
