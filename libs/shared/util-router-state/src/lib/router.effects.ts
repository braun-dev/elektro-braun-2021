import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { actions as RouterActions } from './router.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class RouterEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.go),
      tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { ...queryParams, ...extras }))
    ), { dispatch: false }
  )

  navigateWithStoreParam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.goWithStoreParam),
      concatLatestFrom(({ selector }) => this.store.select(selector)),
      tap(([{ path, query: queryParams, extras }, value ]) => {
        return this.router.navigate([...path, value], { ...queryParams, ...extras })
      })
    ), { dispatch: false }
  )

  forward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => this.location.back())
    ), { dispatch: false }
  )

  back$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => this.location.forward())
    ), { dispatch: false }
  )
}
