import { Routes } from '@angular/router';
import { AuthGuard } from '@elektro-braun/auth/api';

export const FEATURE_ROUTES: Routes = [
  {
    path: 'users',
    data: { animationKey: 'USERS' },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: 'create',
        data: { animationKey: 'USERS/CREATE' },
        loadChildren: () => import('./modules/create/create.module').then(m => m.CreateModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
];
