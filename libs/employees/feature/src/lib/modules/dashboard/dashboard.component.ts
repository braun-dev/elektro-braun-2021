import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeesFacade } from '@elektro-braun/employees/domain';

@Component({
  selector: 'employees-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

    constructor(private dashboardFacade: EmployeesFacade) {}

    ngOnInit(): void {}
}

