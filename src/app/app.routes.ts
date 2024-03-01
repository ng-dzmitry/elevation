import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => (import('./features/elevation/elevation.component').then((x) => x.ElevationComponent)) },
  { path: '**', redirectTo: '' }
];
