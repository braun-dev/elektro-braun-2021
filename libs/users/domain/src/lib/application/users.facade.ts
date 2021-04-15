import { Injectable } from '@angular/core';
import { selectors as UserSelectors } from '../+state/user.selectors';
import { Action, Store } from '@ngrx/store';


@Injectable({ providedIn: 'root' })
export class UsersFacade {

  readonly users$ = this.store.select(UserSelectors.selectAll);
  readonly loading$ = this.store.select(UserSelectors.selectLoading);
  readonly entities$ = this.store.select(UserSelectors.selectEntities);
  readonly employeeCount$ = this.store.select(UserSelectors.selectTotal);
  readonly ids$ = this.store.select(UserSelectors.selectIds);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

}
