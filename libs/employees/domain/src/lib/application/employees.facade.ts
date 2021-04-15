import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { selectors as EmployeeSelectors } from '../+state/employee.selectors';

@Injectable({ providedIn: 'root' })
export class EmployeesFacade {

  readonly state$ = this.store.select(EmployeeSelectors.selectState);
  readonly employees$ = this.store.select(EmployeeSelectors.selectAll);
  readonly selectedEmployee$ = this.store.select(EmployeeSelectors.selectSelectedEmployee);
  readonly loading$ = this.store.select(EmployeeSelectors.selectLoading);
  readonly entities$ = this.store.select(EmployeeSelectors.selectEntities);
  readonly employeeCount$ = this.store.select(EmployeeSelectors.selectTotal);
  readonly ids$ = this.store.select(EmployeeSelectors.selectIds);

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
