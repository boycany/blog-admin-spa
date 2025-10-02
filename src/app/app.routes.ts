import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginPageGuard } from './core/guards/login-page-guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    loadChildren: () => import('./article/articles.routes'),
  },
  {
    path: 'auth',
    canActivate: [loginPageGuard],
    loadComponent: () => import('./auth/auth').then((m) => m.Auth),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
