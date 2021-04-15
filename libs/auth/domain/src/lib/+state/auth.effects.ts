import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../infrastructure/auth.service';
import { actions as AuthActions } from './auth.actions';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticate),
      switchMap(({ email, password }) =>
        this.authService.authenticate(email, password).pipe(
          map(({ user, token }) => AuthActions.authenticateSuccess({ user, token })),
          catchError(error => of(AuthActions.authenticateFailure({ error })))
        )
      )
    )
  )

  authenticateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap(({ token}) => this.authService.setToken(token)),
      map(() => RouterActions.go({ path: ['/employees'] }))
    )
  )

  authenticateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateFailure),
      tap(() => window.alert('Falscher Benutzername oder falsches Kennwort!')),
      map(({ error }) => AuthActions.authenticateFailure({ error })),
    ), { dispatch: false }
  );

  checkIfUserIsAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkIfIsAuthenticated),
      map(() => this.authService.hasValidToken()),
      map(hasToken => hasToken
        ? AuthActions.authenticateSuccess(this.authService.getUserAndToken())
        : RouterActions.go({ path: ['/auth'] })
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.removeToken()),
      map(() => RouterActions.go({ path: ['/auth'] }))
    )
  )
}
