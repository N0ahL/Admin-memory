import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);

  username = '';
  password = '';

  async onSubmit() {
    try {
      await this.authService.login(this.username, this.password);
    } catch (error: any) {
      alert(error.message ?? 'Kon geen verbinding maken met de server');
      console.error('Login mislukt:', error);
    }
  }
}
