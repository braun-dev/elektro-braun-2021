import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'employees-feature',
  template: `<router-outlet></router-outlet>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFeatureComponent {}
