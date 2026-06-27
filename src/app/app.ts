import { Component, signal, OnInit, inject } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { setupFetchInterceptor } from './fetch-interceptor';
export let updateLoginStatus = () => {};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private router = inject(Router);
  public isLoggedIn = signal(false);

  protected readonly title = signal('Admin-memory');
  ngOnInit() {
    setupFetchInterceptor(this.router);

    updateLoginStatus = () => {
      this.isLoggedIn.set(!!localStorage.getItem('token'));
    };
    updateLoginStatus();
  }
  onLogout(){
    localStorage.removeItem('token')
    this.isLoggedIn.set(false);
  }
}
