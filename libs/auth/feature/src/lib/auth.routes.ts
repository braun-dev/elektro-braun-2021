import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES : Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', loadChildren: () => import('./register/auth-feature-register.module').then(m => m.AuthFeatureRegisterModule) }
]
