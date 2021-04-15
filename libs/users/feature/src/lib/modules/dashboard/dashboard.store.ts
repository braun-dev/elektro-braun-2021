import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { User, UsersFacade } from '@elektro-braun/users/domain';

export interface DashboardViewModel {
  users: User[];
  loading: boolean;
  selected: User | null;
}

export interface EmployeeDashboardState {
  users: User[],
  selectedUser: User | null;
  loading: boolean;
}

@Injectable()
export class DashboardStore extends ComponentStore<EmployeeDashboardState> {

  constructor(private usersFacade: UsersFacade) {
    super({ users: [], loading: false, selectedUser: null });
  }

  readonly users$: Observable<User[]> = this.usersFacade.users$;
  readonly loading$: Observable<boolean> = this.usersFacade.loading$;
  readonly selected$: Observable<User | null> = this.select(state => state.selectedUser);

  readonly vm$: Observable<DashboardViewModel> = combineLatest([this.users$, this.loading$, this.selected$]).pipe(
    map(([users, loading, selected]) => ({ users, loading, selected }))
  );

  readonly selectOrUnselect = this.updater((state, user: User) => ({
    ...state,
    selectedUser: state.selectedUser === user ? null : user
  }))

  dispatch(action: Action): void {
    this.usersFacade.dispatch(action);
  }
}
