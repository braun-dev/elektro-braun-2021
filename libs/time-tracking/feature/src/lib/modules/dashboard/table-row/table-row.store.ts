import { Injectable } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { TimeReport } from '@elektro-braun/time-tracking/domain';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Update } from '@ngrx/entity';
import { distinctUntilChanged, map } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Holiday } from '@elektro-braun/holidays/domain';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { HolidaysApiService } from '@elektro-braun/holidays/api';
import { DateService } from '@elektro-braun/shared/util-date';

export interface ReportRowState {
  report: TimeReport;
  editing: boolean;
  holiday: Holiday | null;
  holidays: Holiday[];
  viewMode: 'create' | 'viewOrEdit';
}

export interface ReportRowViewModel {
  report: TimeReport;
  isEditing: boolean;
  holiday: Holiday | null;
  viewMode: 'create' | 'viewOrEdit';
}

@Injectable()
export class ReportRowStore extends RxState<ReportRowState> {

  readonly update$ = new Subject<Update<TimeReport>>();
  readonly checkDate$ = new Subject<string>();

  holidayIfDateIsHoliday$ = combineLatest([
    this.checkDate$.pipe(distinctUntilChanged()),
    this.select('holidays')
  ]).pipe(
    map(([date]) => {
      const dateParts = date.split('.');
      if (dateParts.length !== 3) { return '' }
      return date && this.dateService.format(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`, 'yyyy-dd-MM')
    }),
    map(date => this.get('holidays').find(holiday => holiday.date === date) ?? null),
  )

  constructor(private holidaysApi: HolidaysApiService, private dateService: DateService) {
    super();
    this.connect('holidays', this.holidaysApi.holidaysForYear$);
    this.connect('holiday', this.holidayIfDateIsHoliday$);
  }

  readonly holidays$ = this.select('holidays');

  readonly vm$: Observable<ReportRowViewModel> = this.select(
    selectSlice(['report', 'editing', 'viewMode', 'holiday']),
    map(({ report, editing: isEditing, viewMode, holiday }) =>  ({
      report,
      isEditing: viewMode === 'create' || isEditing,
      viewMode,
      holiday
    }))
  )
}
