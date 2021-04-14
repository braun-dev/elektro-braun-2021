import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeResourceService } from '../infrastructure/employee-resource.service';
import * as EmployeeActions from '../+state/employee.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private service: EmployeeResourceService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.load),
      switchMap(() =>
        this.service.load().pipe(
          map(employees => EmployeeActions.loadSuccess({ employees })),
          catchError(error => of(EmployeeActions.loadFailure({ error })))
        )
      )
    )
  )
}
