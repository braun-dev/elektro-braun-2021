import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'elektro-braun-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'time-tracking';
}
