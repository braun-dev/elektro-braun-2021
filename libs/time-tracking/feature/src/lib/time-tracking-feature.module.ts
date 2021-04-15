import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackingComponent } from './time-tracking.component';
import { RouterModule } from '@angular/router';
import { TIME_TRACKING_ROUTES } from './time-tracking.routes';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';
import { TimeTrackingDomainModule } from '@elektro-braun/time-tracking/domain';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TIME_TRACKING_ROUTES),
    TimeTrackingDomainModule,
    SharedUiComponentsModule
  ],
  declarations: [TimeTrackingComponent],
  exports: [],
  providers: []
})
export class TimeTrackingFeatureModule {}
