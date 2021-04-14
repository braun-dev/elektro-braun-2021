import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@elektro-braun/auth/feature').then((m) => m.AuthFeatureModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@elektro-braun/time-tracking/feature').then(
        (m) => m.TimeTrackingFeatureModule
      ),
  },
  { path: '**', redirectTo: '' },
];
