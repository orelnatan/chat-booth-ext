import { Routes } from '@angular/router';

import { authRoutes } from '@chat-booth/auth/auth.routes';

export const coreRoutes: Routes = [
  { 
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { 
    path: 'auth',
    loadComponent: () => import('../auth/auth-root.component').then(auth => auth.AuthRootComponent),
    children: [ ...authRoutes ]
  },
];
