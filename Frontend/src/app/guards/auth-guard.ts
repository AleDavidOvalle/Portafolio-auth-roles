import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: any): boolean {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data?.role;
    const userRole = this.auth.getRole();

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/profile']); 
      return false;
    }

    return true;
  }
}