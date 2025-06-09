import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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

    this.http.post('/api/auth/login', payload.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']), // or wherever
      error: (err) => alert('Login failed')
    });
  }
}
