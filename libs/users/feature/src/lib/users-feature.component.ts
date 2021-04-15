import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'eb-users-feature',
  template: `<router-outlet></router-outlet>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFeatureComponent {}
