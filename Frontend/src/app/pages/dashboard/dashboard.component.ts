import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private auth: AuthService, private router: Router) {}


  ngOnInit() {
    this.auth.getDashboard().subscribe({
      next: res => this.data = res,
      error: err => console.error(err)
    });
  }
  logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}

goToProfile() {
  this.router.navigate(['/profile']);
}
}