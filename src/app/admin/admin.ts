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
  }
}
