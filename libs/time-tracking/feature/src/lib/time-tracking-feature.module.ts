import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackingComponent } from './time-tracking.component';
import { RouterModule } from '@angular/router';
import { TIME_TRACKING_ROUTES } from './time-tracking.routes';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TIME_TRACKING_ROUTES),
    SharedUiComponentsModule
  ],
  declarations: [TimeTrackingComponent],
  exports: []
})
export class TimeTrackingFeatureModule {}
