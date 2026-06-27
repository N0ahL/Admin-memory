import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router'; //

@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  stats: any = null;
  players: any = [];

  async ngOnInit() {
    // const statsResponse = await fetch('http://localhost:8000/admin/aggregate');
    // const playersResponse = await fetch('http://localhost:8000/admin/players');
    //
    // if (statsResponse.ok && playersResponse.ok) {
    //   this.stats = await statsResponse.json();
    //   this.players = await playersResponse.json();
    //   if (this.stats?.[2]) {
    //     this.stats[2] = this.stats[2].reduce((max: any, item: any) => item.aantal > max.aantal ? item : max);
    //   }
    //   console.log('Stats:', this.stats);
    // }
  }
}
