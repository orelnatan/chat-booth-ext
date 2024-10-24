import { Routes } from '@angular/router';

import { coreRoutes } from './core/core.routes';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { 
    path: '',
    loadComponent: () => import('./core/core.root.component').then(core => core.CoreRootComponent),
    children: [ ...coreRoutes ]
  },
];
