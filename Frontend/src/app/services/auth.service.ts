import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(this.API + '/login', data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user)); 
        })
      );
  }

  register(data: any) {
    return this.http.post(this.API + '/register', data);
  }

  getDashboard() {
    return this.http.get(this.API + '/dashboard', {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  updateProfile(data: any) {
    return this.http.put(this.API + '/profile', data, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getRole() {
    return this.getUser()?.role;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}