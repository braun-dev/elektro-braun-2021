import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { AuthFeatureLoginModule } from './login/auth-feature-login.module';

@NgModule({
  imports: [
    CommonModule,
    AuthFeatureLoginModule,
    RouterModule.forChild(AUTH_ROUTES)
  ],
  declarations: [],
  exports: [],
})
export class AuthFeatureModule {}
