import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { selectors as TimeReportSelectors } from '../+state/time-report.selectors';

@Injectable({ providedIn: 'root' })
export class TimeReportFacade {

  readonly timeReports$ = this.store.select(TimeReportSelectors.selectAll);
  readonly entities$ = this.store.select(TimeReportSelectors.selectEntities);
  readonly ids$ = this.store.select(TimeReportSelectors.selectIds);
  readonly stats$ = this.store.select(TimeReportSelectors.selectReportStats);
  readonly count$ = this.store.select(TimeReportSelectors.selectTotal);
  readonly loading$ = this.store.select(TimeReportSelectors.selectLoading);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
