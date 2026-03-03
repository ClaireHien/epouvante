import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  // On importe CommonModule pour les directives de base et FormsModule pour le [(ngModel)]
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  // Modèle de données pour le formulaire
  user = {
    name: '',
    email: '',
    password: ''
  };

  // Message pour afficher les erreurs éventuelles
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onRegister() {
    this.errorMessage = ''; // Réinitialisation de l'erreur

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Utilisateur créé avec succès !', response);
        // On redirige vers le login après l'inscription
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription', err);
        // Gestion simple des erreurs (ex: email déjà pris)
        if (err.status === 422) {
          this.errorMessage = 'Les données sont invalides ou l\'email est déjà utilisé.';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
        }
      }
    });
  }
}