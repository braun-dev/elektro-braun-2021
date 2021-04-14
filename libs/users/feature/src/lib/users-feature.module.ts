import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDomainModule } from '@elektro-braun/users/domain';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './users-feature.routes';
import { UsersFeatureComponent } from './users-feature.component';

@NgModule({
  imports: [
    CommonModule,
    UsersDomainModule,
    RouterModule.forChild(FEATURE_ROUTES)
  ],
  declarations: [
    UsersFeatureComponent
  ],
  exports: [],
})
export class UsersFeatureModule {}
