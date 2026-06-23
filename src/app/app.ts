import { Component, signal, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { setupFetchInterceptor } from './fetch-interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private router = inject(Router);

  protected readonly title = signal('Admin-memory');
  ngOnInit() {
    setupFetchInterceptor(this.router);
  }
}
