import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actions as HolidayActions } from './holiday.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HolidayResourceService } from '../infrastructure/holiday-resource.service';

@Injectable()
export class HolidayEffects {
  constructor(private actions$: Actions, private service: HolidayResourceService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HolidayActions.loadForYear),
      switchMap(({ year }) =>
        this.service.load(year).pipe(
          map(holidays => HolidayActions.loadForYearSuccess({ holidays, year })),
          catchError(error => of(HolidayActions.loadForYearFailure({ error })))
        )
      )
    )
  )
}
