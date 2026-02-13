import { UpdateForm } from '../components/update-form/update-form';
import { Login } from '../components/authentification/login/login';
import { Profile } from '../components/profile/profile';
import { Dashboard } from '../components/dashboard/dashboard';

export const HomePage = {
  path: '',
  component: Dashboard,
  title: 'Home',
};

export const UpdatePage = {
  path: 'update/:id',
  component: UpdateForm,
  buildPath: (id: number) => `update/${id}`,
  title: 'Update Student',
};

export const LoginPage = {
  path: 'login',
  component: Login,
  title: 'Login',
};

export const ProfilePage = {
  path: 'profile',
  component: Profile,
  title: 'profile',
};
