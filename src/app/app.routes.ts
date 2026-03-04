import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { ProfileComponent } from './profile/profile';
import { RegisterComponent } from './register/register';
import { UserListComponent } from './user-list/user-list';
import { FanzineListComponent } from './fanzine-list/fanzine-list';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'fanzine', component: FanzineListComponent },
  { path: '**', redirectTo: '' }
];