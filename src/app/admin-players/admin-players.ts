import { Component, OnInit, signal } from '@angular/core';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-admin-players',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './admin-players.html',
  styleUrl: './admin-players.css',
})
export class AdminPlayers implements OnInit {
  public spelersLijst = signal<any[]>([]);
  async ngOnInit() {
    const response = await fetch('http://localhost:8000/admin/players');

    if (response.ok) {
      const data = await response.json();
      this.spelersLijst.set(data);
      console.log(data)
    }
  }

  async getPlayerDetails(speler: any){
    console.log('ID via .id:', speler.id);
    const response = await fetch('http://localhost:8000/admin/aggregate')

    if(response.ok){
      const data = await response.json();
      console.log(data)
    }
  }
}
