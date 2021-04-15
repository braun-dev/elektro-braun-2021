import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CreateTimeReportStore } from './create-time-report.store';
import { CreateTimeReport, TimeReport } from '@elektro-braun/time-tracking/domain';

@Component({
  selector: 'elektro-braun-create-time-report',
  templateUrl: './create-time-report.component.html',
  styleUrls: ['./create-time-report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateTimeReportStore]
})
export class CreateTimeReportComponent implements OnInit {

  vm$ = this.componentStore.vm$;

  // Todo
  private id = 1;

  constructor(private componentStore: CreateTimeReportStore) { }

  ngOnInit(): void {
    return;
  }

  readonly trackByFn = (_: number, report: TimeReport) => report.id ?? report;

  onDelete(report: TimeReport): void {
    this.componentStore.deleteReport$.next(report);
  }

  onRecord(partialReport: CreateTimeReport, employeeId: string): void {
    // this.componentStore.addReport$.next({ id: this.id + '', employeeId, ...partialReport });
    // this.id++;
  }

  saveReports(): void {
    this.componentStore.saveReports$.next();
  }
}
