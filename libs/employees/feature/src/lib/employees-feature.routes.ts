import { Routes } from '@angular/router';
import { AuthGuard } from '@elektro-braun/auth/api';

export const FEATURE_ROUTES: Routes = [
  {
    path: 'employees',
    data: { animationKey: 'EMPLOYEES' },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        data: { animationKey: 'EMPLOYEES/CREATE' },
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
]
