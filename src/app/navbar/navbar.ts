import { Component, inject,OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth'; // Assure-toi du chemin

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  // Injection des services
  private authService = inject(AuthService);
  private router = inject(Router);

  loggedIn = false;
  ngOnInit() {
    // La Navbar écoute maintenant le service en continu
    this.authService.isLoggedIn$.subscribe(status => {
      this.loggedIn = status;
    });
  }

  // On vérifie si l'utilisateur est connecté (ex: présence d'un token)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  logout() {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.warn('Erreur lors du logout API, nettoyage local uniquement', err);
          localStorage.removeItem('auth_token'); // Sécurité : on vide quand même
          this.router.navigate(['/login']);
        }
      });
    }
}