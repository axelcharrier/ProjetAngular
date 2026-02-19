import { UpdateForm } from '../components/update-form/update-form';
import { Login } from '../components/authentication/login/login';
import { Profile } from '../components/profile/profile';
import { Dashboard } from '../components/dashboard/dashboard';
import { UsersDashboard } from '../components/users-managment/users-dashboard/users-dashboard';
import { UsersUpdate } from '../components/users-managment/users-update/users-update';

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

export const UsersDashboardPage = {
  path: 'users-dashboard',
  component: UsersDashboard,
  title: 'users-dashboard',
};

export const UserUpdatePage = {
  path: 'user-update/:mail',
  component: UsersUpdate,
  buildpath: (mail: string) => `user-update/${mail}`,
  title: 'user-dashboard',
};
