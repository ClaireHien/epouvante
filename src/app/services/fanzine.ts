import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour typer tes données et aider Fen (l'autocomplétion)
export interface Fanzine {
  id: number;
  name: string;
  number: number;
  image: string | null;
  description: string;
  price: number;
  pdf_path?: string;
  // Données de la table pivot Laravel
  pivot?: {
    status: 'paid' | 'unpaid';
    purchased_at: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FanzineService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';

  /**
   * Récupère tous les fanzines (Public)
   */
  getFanzines(): Observable<Fanzine[]> {
    return this.http.get<Fanzine[]>(`${this.apiUrl}/fanzines`);
  }

  /**
   * Détails d'un fanzine spécifique (Public)
   */
  getFanzineById(id: number): Observable<Fanzine> {
    return this.http.get<Fanzine>(`${this.apiUrl}/fanzines/${id}`);
  }

  /**
   * Récupère le profil complet de l'utilisateur avec SES fanzines (Sécurisé)
   * Laravel renverra l'utilisateur + la relation 'fanzines'
   */
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/profile`);
  }

  /**
   * Acheter un fanzine (Sécurisé)
   */
  buyFanzine(fanzineId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/fanzines/${fanzineId}/buy`, {});
  }

  /**
   * Payer un fanzine (Sécurisé)
   */
  payFanzine(fanzineId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/fanzines/${fanzineId}/pay`, {});
  }

  /**
   * Télécharger le PDF (Sécurisé - renvoie un Blob)
   */
  downloadFanzine(fanzineId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/fanzines/${fanzineId}/download`, {
      responseType: 'blob'
    });
  }
}