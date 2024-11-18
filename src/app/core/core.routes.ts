import { Routes } from '@angular/router';

import { AuthGuard } from './guards';

export const CORE_ROUTES: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { 
    path: '',
    loadComponent: () => import('./core-root.component').then(core => core.CoreRootComponent),
    children: [
      { 
        path: 'auth',
        loadChildren: () => import('../auth/auth.routes').then(auth => auth.AUTH_ROUTES),
      },
      { 
        path: 'home',
        loadChildren: () => import('../home/home.routes').then(home => home.HOME_ROUTES),
        canActivateChild: [AuthGuard],
      },
    ]
  },
];
