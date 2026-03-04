import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FanzineService, Fanzine } from '../services/fanzine';

@Component({
  selector: 'app-fanzine-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fanzine-list.html'
})
export class FanzineListComponent implements OnInit {
  private fanzineService = inject(FanzineService);
  fanzines: Fanzine[] = [];

  ngOnInit() {
    this.fanzineService.getFanzines().subscribe({
      next: (data) => this.fanzines = data,
      error: (err) => console.error('Erreur chargement fanzines', err)
    });
  }

  quickBuy(id: number) {
    this.fanzineService.buyFanzine(id).subscribe({
      next: () => {
        alert('Fanzine ajouté à votre collection ! (Paiement en attente)');
        // Optionnel : rediriger vers le profil pour payer
      },
      error: (err) => {
        if (err.status === 401) alert('Veuillez vous connecter pour acheter.');
      }
    });
  }
}