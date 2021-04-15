import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducer } from './+state/time-report.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TimeReportEffects } from './+state/time-report.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([TimeReportEffects])
  ],
})
export class TimeTrackingDomainModule {}
