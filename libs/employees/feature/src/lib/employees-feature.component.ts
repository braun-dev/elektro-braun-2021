import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'employees-feature',
  template: `<router-outlet></router-outlet>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFeatureComponent {}
