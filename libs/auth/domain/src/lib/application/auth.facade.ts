import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@elektro-braun/users/domain';
import { selectors as AuthSelectors } from '../+state/auth.selectors';
import { Action, Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {

  user$: Observable<User> = this.store.select(AuthSelectors.selectUser);
  loading$: Observable<boolean> = this.store.select(AuthSelectors.selectLoading);
  isAuthenticated$: Observable<boolean> = this.store.select(AuthSelectors.selectIsAuthenticated);
  token$: Observable<string> = this.store.select(AuthSelectors.selectToken);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
