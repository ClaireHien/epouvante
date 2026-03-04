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
}