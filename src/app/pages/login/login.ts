import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const payload = new URLSearchParams();
    payload.set('username', this.username);
    payload.set('password', this.password);
    this.http.post(`${environment.apiBaseUrl}`+'/api/auth/login', payload.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    }).subscribe({
      next: () => this.router.navigate(['/somewhere']), // to be added an admin and user page
      error: (err) => alert('Login failed')
    });
  }
}
