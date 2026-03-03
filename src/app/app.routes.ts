import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { UserListComponent } from './components/user-list/user-list';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: 'login' }
];