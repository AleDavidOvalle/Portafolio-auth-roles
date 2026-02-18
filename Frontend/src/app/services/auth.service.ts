import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:3000/api/auth'; // ajusta si usas otro puerto

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(this.API + '/login', data)
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
}

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
