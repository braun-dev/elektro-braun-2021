import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserResourceService } from '../infrastructure/user-resource.service';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { actions as UserActions } from './user.actions';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private service: UserResourceService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.load),
      switchMap(() =>
        this.service.loadUsers().pipe(
          map(users => UserActions.loadSuccess({ users })),
          catchError(error => of(UserActions.loadFailure({ error })))
        )
      )
    )
  )


  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create),
      exhaustMap(({ user }) =>
        this.service.createUser(user).pipe(
          map(user => UserActions.createSuccess({ user })),
          catchError(error => of(UserActions.createFailure({ error })))
        )
      )
    )
  )

  createSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createSuccess),
      map(() => RouterActions.go({ path: ['/users'] }))
    )
  )
}
