import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  { 
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  { 
    path: '',
    loadComponent: () => import('./home-root.component').then(home => home.HomeRootComponent),
    children: [
      { 
        path: 'board',
        loadChildren: () => import('./pages/board-page').then(board => board.BOARD_PAGE_ROUTES),
      },
      { 
        path: 'booth/:boothId',
        loadChildren: () => import('./pages/booth-page').then(booth => booth.BOOTH_PAGE_ROUTES),
      },
    ]
  },
];
