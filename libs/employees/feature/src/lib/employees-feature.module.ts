import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesDomainModule } from '@elektro-braun/employees/domain';
import { EmployeesFeatureComponent } from './employees-feature.component';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './employees-feature.routes';

@NgModule({
  imports: [
    CommonModule,
    EmployeesDomainModule,
    RouterModule.forChild(FEATURE_ROUTES)
  ],
  declarations: [EmployeesFeatureComponent],
  exports: [],
})
export class EmployeesFeatureModule {}
