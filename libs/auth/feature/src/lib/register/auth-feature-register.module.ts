import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDomainModule } from '@elektro-braun/auth/domain';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { REGISTER_ROUTES } from './register.routes';

@NgModule({
  imports: [
    CommonModule,
    AuthDomainModule,
    RouterModule.forChild(REGISTER_ROUTES)
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class AuthFeatureRegisterModule {}
