import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES : Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadChildren: () => import('./register/auth-feature-register.module').then(m => m.AuthFeatureRegisterModule)
      },
      {
        path: '', component: LoginComponent,
        loadChildren: () => import('./login/auth-feature-login.module').then(m => m.AuthFeatureLoginModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },

]
