import { Routes } from '@angular/router';

export const BOOTH_PAGE_ROUTES: Routes = [
  { 
    path: '',
    loadComponent: () => import('./booth-page.component').then(booth => booth.BoothPageComponent),
  },
];
