import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: '',
    loadComponent: () => import('./auth-root.component').then(auth => auth.AuthRootComponent),
    children: [
      { 
        path: 'login',
        loadChildren: () => import('./pages/login-page').then(login => login.LOGIN_PAGE_ROUTES),
      },
    ]
  },
];
