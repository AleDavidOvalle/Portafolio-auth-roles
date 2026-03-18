import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [

  // 🔓 Públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Solo ADMIN
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },

  // 🔐 USER y ADMIN
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  // 🧭 Default
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🚫 Ruta no encontrada
  { path: '**', redirectTo: 'login' }
];