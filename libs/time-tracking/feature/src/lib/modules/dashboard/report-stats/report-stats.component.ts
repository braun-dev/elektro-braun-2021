import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TimeReportStats } from '@elektro-braun/time-tracking/domain';

@Component({
  selector: 'elektro-braun-report-stats',
  templateUrl: './report-stats.component.html',
  styleUrls: ['./report-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportStatsComponent implements OnInit {

  @Input() stats: TimeReportStats | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
