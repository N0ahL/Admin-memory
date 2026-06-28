import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private router = inject(Router);

  isLoggedIn = signal(!!localStorage.getItem('token'));

  async login(username: string, password: string): Promise<void> {
    const logInData = { username, password };

    const response = await fetch('http://localhost:8000/memory/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(logInData)
    });

    if (!response.ok) {
      throw new Error('Verkeerde inloggegevens');
    }

    const data: LoginResponse = await response.json();

    if (username === 'Henk') {
      this.setToken(data.token);
      await this.router.navigate(['/admin']);
    } else {
      throw new Error(`${username} heeft geen admin rechten!`);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
