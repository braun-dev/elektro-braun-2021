import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { actions as TimeReportActions } from '../+state/time-report.actions';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TimeTrackingResourceService } from '../infrastructure/time-report-resource.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EmployeesApiService } from '@elektro-braun/employees/api';

@Injectable()
export class TimeReportEffects {
  constructor(
    private actions$: Actions,
    private service: TimeTrackingResourceService,
    private employeeApi: EmployeesApiService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeReportActions.load),
      concatLatestFrom(() => this.employeeApi.selectedEmployee$.pipe(map(o => o?.id))),
      switchMap(([{ employeeId, from, to }, _employeeId]) =>
        this.service.load(employeeId ? employeeId : _employeeId, { from, to }).pipe(
          map(reports => TimeReportActions.loadSuccess({ reports })),
          catchError(error => of(TimeReportActions.loadFailure({ error })))
        )
      )
    )
  )

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeReportActions.create),
      switchMap(({ payload, employeeId }) =>
        this.service.save(payload, employeeId).pipe(
          map(report => TimeReportActions.createSuccess({ report })),
          catchError(error => of(TimeReportActions.createFailure({ error })))
        )
      )
    )
  )

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeReportActions.remove),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(deletedReportId => TimeReportActions.removeSuccess({ id: deletedReportId })),
          catchError(error => of(TimeReportActions.removeFailure({ error })))
        )
      )
    )
  )

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeReportActions.update),
      concatMap(({ report }) =>
        this.service.update(report).pipe(
          map(({ id, ...changes }) => TimeReportActions.updateSuccess({ update: { id, changes } })),
          catchError(error => of(TimeReportActions.updateFailure({ error })))
        )
      )
    )
  )
}
