import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/elevation/elevation.routes').then((x) => x.elevationRoutes)
  },
  { path: '**', redirectTo: '' }
];
