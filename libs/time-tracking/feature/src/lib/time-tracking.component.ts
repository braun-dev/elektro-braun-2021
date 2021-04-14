import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'elektro-braun-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTrackingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
