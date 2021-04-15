import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { actions as HolidayActions, HolidaysFacade } from '@elektro-braun/holidays/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HolidaysApiService {
  holidaysForYear$ = this.holidaysFacade.holidays$;
  holidayEntities$ = this.holidaysFacade.holidayEntities$;
  loading$ = this.holidaysFacade.loading$;
  loadedYears$: Observable<number[]> = this.holidaysFacade.loadedYears$;

  constructor(private holidaysFacade: HolidaysFacade) {}

  loadYear(year: number): void {
    this.holidaysFacade.dispatch(HolidayActions.loadForYear({ year }));
  }
}
