import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Données de la landing page basées sur le contexte 
  sections = [
    {
      title: 'Édition de Fanzine',
      description: 'Le fanzine historique disponible en version papier et numérique. 4 numéros par an pour les vrais passionnés.',
      icon: '📖',
      link: '/fanzine'
    },
    {
      title: 'Produits Dérivés',
      description: 'Goodies exclusifs, DVD, Blu-ray restaurés et jeux de société horrifiques dans nos boutiques et en ligne.',
      icon: '💀',
      link: '/shop'
    },
    {
      title: 'Petit Festival de l\'Épouvante',
      description: 'Projections, masterclasses et tournois. Vivez l\'expérience du frisson en communauté.',
      icon: '🎬',
      link: '/festival'
    },
    {
      title: 'Collectif Evil Ed',
      description: 'Production de web-séries et restauration de films cultes comme "L\'Orc". Soutenez le genre via le crowdfunding.',
      icon: '👁️',
      link: '/evil-ed'
    }
  ];
}