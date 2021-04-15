import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDomainModule } from '@elektro-braun/auth/domain';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  imports: [
    CommonModule,
    AuthDomainModule,
    ReactiveFormsModule,
    SharedUiComponentsModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthFeatureLoginModule {}
