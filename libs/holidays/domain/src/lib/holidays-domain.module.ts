import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducer } from './+state/holiday.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HolidayEffects } from './+state/holiday.effects';
import { HolidaysFacade } from './application/holidays.facade';
import { actions as HolidayActions } from './+state/holiday.actions';
import { DateService } from '@elektro-braun/shared/util-date';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([HolidayEffects])
  ],
})
export class HolidaysDomainModule {
  constructor(private facade: HolidaysFacade) {
    const year = DateService.getCurrentYear();
    this.facade.dispatch(HolidayActions.loadForYear({ year }))
  }
}
