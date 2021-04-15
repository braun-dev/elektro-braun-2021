import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { TimeReport } from '@elektro-braun/time-tracking/domain';

@Component({
  selector: 'elektro-braun-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportViewComponent {

  @Input() report: TimeReport | null = null;
  @Output() delete = new EventEmitter<TimeReport>();

  get difference(): number {
    if (!this.report) { return }
    return this.report.totalHours - this.report.regularHours;
  }
}
