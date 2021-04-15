import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Employee, EmployeesFacade } from '@elektro-braun/employees/domain';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';

export interface DashboardViewModel {
  employees: Employee[];
  loading: boolean;
  selected: Employee | null;
}

export interface EmployeeDashboardState {
  employees: Employee[],
  selectedEmployee: Employee | null;
  loading: boolean;
}

@Injectable()
export class DashboardStore extends ComponentStore<EmployeeDashboardState> {

  constructor(private dashboardFacade: EmployeesFacade) {
    super({ employees: [], loading: false, selectedEmployee: null });
  }

  readonly employees$: Observable<Employee[]> = this.dashboardFacade.employees$;
  readonly loading$: Observable<boolean> = this.dashboardFacade.loading$;
  readonly selected$: Observable<Employee | null> = this.select(state => state.selectedEmployee);

  readonly vm$: Observable<DashboardViewModel> = combineLatest([this.employees$, this.loading$, this.selected$]).pipe(
    map(([employees, loading, selected]) => ({ employees, loading, selected }))
  );

  readonly selectOrUnselect = this.updater((state, employee: Employee) => ({
    ...state,
    selectedEmployee: state.selectedEmployee === employee ? null : employee
  }))

  dispatch(action: Action): void {
    this.dashboardFacade.dispatch(action);
  }
}
