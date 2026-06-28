import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminStats, Speler } from '../services/admin-stats';

@Component({
  selector: 'app-admin-players',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './admin-players.html',
  styleUrl: './admin-players.css',
})
export class AdminPlayers implements OnInit {
  private adminStats = inject(AdminStats);

  public spelersLijst = signal<Speler[]>([]);
  public isDataLoaded = signal(false);

  async ngOnInit() {
    try {
      const data = await this.adminStats.getPlayers();
      this.spelersLijst.set(data);
      this.isDataLoaded.set(true);
    } catch (error) {
      console.error(error);
    }
  }
}
