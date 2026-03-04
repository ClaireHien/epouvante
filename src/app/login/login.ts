import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour les directives de base
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => console.error('Erreur de connexion', err)
    });
  }
}