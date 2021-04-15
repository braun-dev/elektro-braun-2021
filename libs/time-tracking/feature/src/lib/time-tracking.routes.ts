import { Routes } from '@angular/router';
import { TimeTrackingComponent } from './time-tracking.component';
import { AuthGuard } from '@elektro-braun/auth/api';

export const TIME_TRACKING_ROUTES: Routes = [
  {
    path: 'time-report',
    component: TimeTrackingComponent,
    data: { animationKey: 'TIME_TRACKING' },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: 'create/:id',
        loadChildren: () => import('./modules/create-time-report/create-time-report.module').then(m => m.CreateTimeReportModule),
      },
      {
        path: ':id',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ]
  }
]
