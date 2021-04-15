import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { AuthDomainModule } from '@elektro-braun/auth/domain';

@NgModule({
  imports: [
    CommonModule,
    AuthDomainModule,
    RouterModule.forChild(AUTH_ROUTES)
  ],
  declarations: [],
  exports: [],
})
export class AuthFeatureModule {}
