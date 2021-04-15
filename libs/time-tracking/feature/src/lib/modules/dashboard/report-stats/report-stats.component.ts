import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeReportStats } from '@elektro-braun/time-tracking/domain';

@Component({
  selector: 'elektro-braun-report-stats',
  templateUrl: './report-stats.component.html',
  styleUrls: ['./report-stats.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportStatsComponent {
  @Input() stats: TimeReportStats | null = null;
  @Output() readonly export = new EventEmitter<void>();
}

