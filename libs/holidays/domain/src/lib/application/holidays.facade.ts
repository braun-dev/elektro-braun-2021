import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { selectors as HolidaySelectors } from '../+state/holiday.selectors';
import { Holiday } from '../entities/holiday';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class HolidaysFacade {

  holidays$: Observable<Holiday[]> = this.store.select(HolidaySelectors.selectAll);
  holidayEntities$: Observable<Dictionary<Holiday>> = this.store.select(HolidaySelectors.selectEntities);
  loading$: Observable<boolean> = this.store.select(HolidaySelectors.selectLoading);
  loadedYears$: Observable<number[]> = this.store.select(HolidaySelectors.selectLoadedYears);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
