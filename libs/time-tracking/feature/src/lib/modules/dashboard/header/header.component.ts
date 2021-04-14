import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { DashboardViewModel } from '../dashboard.store';
import { Employee } from '@elektro-braun/employees/domain';
import { TimeSpanQuery } from '@elektro-braun/time-tracking/domain';

@Component({
  selector: 'elektro-braun-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() employees: Employee[] = [];
  @Input() selectedEmployee: Employee | null;
  @Input() filter: DashboardViewModel['filter'] | null = null;
  @Input() focusTrigger$?: Observable<void>

  @Input()
  set focusTrigger(_: never) {
    this.subject.next();
  }

  readonly subject = new Subject<void>();

  @Output() dateChange = new EventEmitter<TimeSpanQuery>()
  @Output() create = new EventEmitter<void>()

  private subscription?: Subscription;

  ngOnInit(): void {
    if (!this.focusTrigger$) { return; }
    this.subscription = this.focusTrigger$.subscribe()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateFromDate(value: string): void {
    const newDateString = this.toIsoDate(value);
    if (this.filter.from === newDateString) { return; }
    const query: TimeSpanQuery = { from: newDateString, to: this.filter.to };
    this.dateChange.emit(query);
  }

  updateToDate(value: string): void {
    const newDateString = this.toIsoDate(value);
    if (this.filter.to === newDateString) { return; }
    const query: TimeSpanQuery = { from: this.filter.from, to: newDateString };
    this.dateChange.emit(query);
  }

  private toIsoDate(value: string): string {
    try {
      const dateParts = value.split('.');
      return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();
    } catch (e) {
      console.log('COULD NOT CREATE DATE STRING!!!')
    }
  }
}
