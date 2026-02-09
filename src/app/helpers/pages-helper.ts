import path from 'path';
import { Home } from '../components/home/home';
import { UpdateForm } from '../components/update-form/update-form';
import { Register } from '../components/authentification/register/register';
import { Login } from '../components/authentification/login/login';

export const HomePage = {
  path: '',
  component: Home,
  title: 'Home',
};

export const UpdatePage = {
  path: (id: number) => `update/${id}`,
  component: UpdateForm,
  title: 'Update Student',
};

export const LoginPage = {
  path: 'login',
  component: Login,
  title: 'Login',
};

export const RegisterPage = {
  path: 'register',
  component: Register,
  title: 'Register',
};
