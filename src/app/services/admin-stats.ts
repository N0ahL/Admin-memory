import { Injectable } from '@angular/core';

export interface Speler {
  id: number;
  username: string;
  email: string;
}

export interface AggregateData {
  aantal_spellen: number;
}

export interface ApiUsage {
  api: string;
  aantal: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminStats {

  async getPlayers(): Promise<Speler[]> {
    const response = await fetch('http://localhost:8000/admin/players');

    if (!response.ok) {
      throw new Error('Kon spelers niet laden');
    }

    return response.json();
  }

  async getAggregate(): Promise<any[]> {
    const response = await fetch('http://localhost:8000/admin/aggregate');

    if (!response.ok) {
      throw new Error('Kon statistieken niet laden');
    }

    return response.json();
  }
}
