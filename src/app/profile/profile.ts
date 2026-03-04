import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FanzineService, Fanzine } from '../services/fanzine';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  private fanzineService = inject(FanzineService);
  
  user: any = null;
  fanzines: Fanzine[] = [];

  ngOnInit() {
    this.fanzineService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.fanzines = data.fanzines; // Laravel renvoie la relation grâce à .load('fanzines')
      },
      error: (err) => console.error('Erreur profil', err)
    });
  }
  // Méthode pour payer un fanzine en attente
  pay(id: number) {
    this.fanzineService.payFanzine(id).subscribe({
      next: () => {
        alert('Paiement validé ! Votre grimoire est désormais accessible.');
        this.ngOnInit(); // On rafraîchit les données
      },
      error: (err) => console.error('Erreur paiement', err)
    });
  }

  // Méthode pour télécharger le PDF
  download(id: number, fileName: string) {
    alert("Téléchargement du fanzine ! Il ne reste plus qu'à le bouquiner !")
  }
}