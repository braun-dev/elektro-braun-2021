import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CreateTimeReport, TimeReport } from '@elektro-braun/time-tracking/domain';
import {
  skeletonFadeAnimation,
  tableEntranceAnimation,
  TableInputComponent
} from '@elektro-braun/shared/ui-components';
import { Subject } from 'rxjs';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'elektro-braun-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    tableEntranceAnimation({ duration: 200, delay: 0 }),
    skeletonFadeAnimation({ duration: 400, delay: 200 })
  ]
})
export class TableComponent {

  @Input() reports: TimeReport[] = [];
  @Input() insertActive = false;
  @Input() loading = false;

  @Output() readonly create = new EventEmitter<CreateTimeReport>()
  @Output() readonly delete = new EventEmitter<string>()
  @Output() readonly update = new EventEmitter<TimeReport>()

  @ViewChild('firstInput', { static: false })
  private readonly firstControl: TableInputComponent | null = null;

  readonly focusTrigger$: Subject<boolean> = new Subject<boolean>();

  readonly trackByFn = (_: number, report: TimeReport) => report.id;

  updateReport(report: TimeReport): void {
    this.update.emit(report);
  }

  deleteReport(id: string): void {
    this.delete.emit(id);
  }

  createReport(report: CreateTimeReport): void {
    this.create.emit(report);
    this.focusInput();
  }

  private focusInput(): void {
    if (this.firstControl && this.firstControl?.element) {
      this.focusTrigger$.next(true);
      this.firstControl?.element?.nativeElement?.focus();
    }
  }
}
