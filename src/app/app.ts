import {Component, OnInit, inject, signal} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { setupFetchInterceptor } from './fetch-interceptor';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private router = inject(Router);
  protected authService = inject(Auth);

  protected readonly title = signal('Admin-memory');

  ngOnInit() {
    setupFetchInterceptor(this.router, this.authService);
  }

  onLogout() {
    this.authService.logout();
  }
}
