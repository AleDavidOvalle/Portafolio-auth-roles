import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class ProfileComponent {

  name = '';

  constructor(private auth: AuthService, private router: Router) {}

  update() {
    this.auth.updateProfile({ name: this.name }).subscribe({
      next: () => alert('Perfil actualizado'),
      error: err => console.error(err)
    });
  }
  logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}