import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDomainModule } from '@elektro-braun/auth/domain';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthDomainModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthFeatureLoginModule {}
