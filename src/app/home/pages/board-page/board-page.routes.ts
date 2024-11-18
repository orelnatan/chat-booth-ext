import { Routes } from '@angular/router';

export const BOARD_PAGE_ROUTES: Routes = [
  { 
    path: '',
    loadComponent: () => import('./board-page.component').then(board => board.BoardPageComponent),
  },
];
