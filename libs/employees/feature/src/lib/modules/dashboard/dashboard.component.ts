import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStore, DashboardViewModel } from './dashboard.store';
import { actions as EmployeeActions, Employee } from '@elektro-braun/employees/domain';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';

@Component({
  selector: 'employees-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardStore]
})
export class DashboardComponent implements OnInit {

  vm$: Observable<DashboardViewModel> = this.state.vm$;

  constructor(private state: DashboardStore) {}

  ngOnInit() {
    this.state.dispatch(EmployeeActions.load());
  }

  selectionChanged(employee: Employee): void {
    this.state.selectOrUnselect(employee);
  }

  navigateToCreate(): void {
    this.state.dispatch(RouterActions.go({ path: ['/employees/create'] }));
  }
}

