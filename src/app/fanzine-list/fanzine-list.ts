import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FanzineService, Fanzine } from '../services/fanzine';
import { AuthService } from '../services/auth';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-fanzine-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fanzine-list.html'
})
export class FanzineListComponent implements OnInit {
  private fanzineService = inject(FanzineService);
  private authService = inject(AuthService);

fanzines: Fanzine[] = [];
  ownedFanzineIds: number[] = []; // Liste des IDs déjà achetés
  isLoggedIn = false;

  ngOnInit() {
    // 1. Vérifier la connexion
    this.isLoggedIn = !!this.authService.getToken();

    // 2. Charger tous les fanzines
    this.fanzineService.getFanzines().subscribe(data => {
      this.fanzines = data;
    });

    // 3. Si connecté, charger les IDs possédés
    if (this.isLoggedIn) {
      this.fanzineService.getUserProfile().subscribe(user => {
        if (user.fanzines) {
          this.ownedFanzineIds = user.fanzines.map((f: any) => f.id);
        }
      });
    }
  }

  // Fonction utilitaire pour le template
  isOwned(fanzineId: number): boolean {
    return this.ownedFanzineIds.includes(fanzineId);
  }

quickBuy(id: number) {
  this.fanzineService.buyFanzine(id).pipe(
    switchMap(() => {
      console.log('Achat enregistré, passage au paiement...');
      return this.fanzineService.payFanzine(id);
    })
  ).subscribe({
    next: () => {
      // AJOUT : On ajoute l'ID à la liste locale immédiatement
      // Cela déclenche la mise à jour automatique du HTML via Angular
      this.ownedFanzineIds.push(id);
      
      alert('📦 Article ajouté ! Votre exemplaire est désormais disponible dans votre antre.');
    },
    error: (err) => {
      if (err.status === 401) {
        alert('Veuillez vous connecter pour accéder au Kiosque Maudit.');
      } else {
        alert('Une erreur est survenue lors de la transaction.');
      }
    }
  });
}
}