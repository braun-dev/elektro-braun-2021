import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'elektro-braun-time-tracking',
  template: `<router-outlet></router-outlet> `,
  styles: [ ':host { min-height: 100%; background-color: #FFFFFF; }' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeTrackingComponent {}
