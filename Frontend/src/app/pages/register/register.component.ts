import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {

  form = {
    email: '',
    password: '',
    role: 'USER'
  };

  constructor(private auth: AuthService,     
    private router: Router
) {}

  register() {
    this.auth.register(this.form).subscribe({
      next: () => alert('Usuario creado'),
      error: err => console.error(err)
    });
  }
  goToLogin() {
  this.router.navigate(['/login']);
}
}