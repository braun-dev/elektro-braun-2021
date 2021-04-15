import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardViewModel } from '../dashboard.store';
import { Employee } from '@elektro-braun/employees/domain';
import { TimeSpanQuery } from '@elektro-braun/time-tracking/domain';
import { DateService } from '@elektro-braun/shared/util-date';

@Component({
  selector: 'elektro-braun-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  readonly subject = new Subject<void>();

  @Input() employees: Employee[] = [];
  @Input() selectedEmployee: Employee | null;
  @Input() filter: DashboardViewModel['filter'] | null = null;
  @Input() showInsert = false;
  @Input() set focusTrigger(_: never) { this.subject.next(); }

  @Output() dateChange = new EventEmitter<{ query: TimeSpanQuery, change: 'from' | 'to' }>()
  @Output() create = new EventEmitter<boolean>()
  @Output() employeeChange = new EventEmitter<{ id: string }>()

  constructor(private dateService: DateService) {}

  updateFromDate(value: string): void {
    this.checkDateInput(value, 'from');
    const newDateString = this.dateService.toISOString(value);
    if (this.filter.from === newDateString) { return; }
    const query: TimeSpanQuery = { from: newDateString === '' ? this.dateService.firstDateOfYear() : newDateString, to: this.filter.to };
    this.dateChange.emit({ query, change: 'from' });
  }

  updateToDate(value: string): void {
    this.checkDateInput(value, 'to');
    const newDateString = this.dateService.toISOString(value);
    if (this.filter.to === newDateString) { return; }
    const query: TimeSpanQuery = { from: this.filter.from, to: newDateString === '' ? this.dateService.currentDate(): newDateString };
    this.dateChange.emit({ query, change: 'to' });
  }

  nextFromDate(): void {
    const query: TimeSpanQuery = { from: this.dateService.nextDate(this.filter.from, false), to: this.filter.to };
    this.dateChange.emit({ query, change: 'from' });
  }

  prevFromDate(): void {
    const query: TimeSpanQuery = { from: this.dateService.prevDate(this.filter.from, false), to: this.filter.to };
    this.dateChange.emit({ query, change: 'from' });
  }

  nextToDate(): void {
    const query: TimeSpanQuery = { from: this.filter.from, to: this.dateService.nextDate(this.filter.to, false) };
    this.dateChange.emit({ query, change: 'to' });
  }

  prevToDate(): void {
    const query: TimeSpanQuery = { from: this.filter.from, to: this.dateService.prevDate(this.filter.to, false) };
    this.dateChange.emit({ query, change: 'to' });
  }

  checkDateInput(value: string, type: 'from' | 'to'): void {
    if (!value || value?.length <= 1) {
      if (this.filter[type] === null || this.filter[type] === '') { return; }
      const query = type === 'to' ? { [type]: null, from: this.filter.from } : { from: null, to: this.filter.to };
      this.dateChange.emit({ query, change: type });
    }
  }
}
