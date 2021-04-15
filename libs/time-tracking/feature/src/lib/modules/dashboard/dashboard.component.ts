import { ChangeDetectionStrategy, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardComponentStore } from './dashboard.store';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';
import { Store } from '@ngrx/store';
import {
  actions as TimeReportActions,
  CreateTimeReport,
  TimeReport,
  TimeReportExportService,
  TimeSpanQuery
} from '@elektro-braun/time-tracking/domain';
import { delay, tap } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Employee } from '@elektro-braun/employees/domain';
import { skeletonFadeAnimation } from '@elektro-braun/shared/ui-components';

@Component({
  selector: 'elektro-braun-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardComponentStore],
  animations: [skeletonFadeAnimation({ duration: 900, delay: 50 })]
})
export class DashboardComponent {

  readonly vm$ = this.componentStore.vm$;
  readonly reports$ = this.componentStore.reports$;
  readonly selectedEmployee$ = this.componentStore.selectedEmployee$;
  readonly stats$ = this.componentStore.stats$;

  readonly selectFocusTrigger$ = new Subject();
  readonly scrollTrigger$ = new Subject();

  // perform scrolling whenever scrollTrigger$.next() emits
  private readonly scrollEffect$ = this.scrollTrigger$.pipe(
    delay(200),
    tap(() => this.scrollToInput())
  )

  @ViewChild('scrollableAnchor') private scrollElement: ElementRef<HTMLElement>;

  constructor(
    private componentStore: DashboardComponentStore,
    private zone: NgZone,
    private store: Store,
    private exportService: TimeReportExportService
  ) {
    componentStore.hold(this.scrollEffect$)
  }

  selectEmployee({ id }: { id: string }): void {
    if (!id) { return; }

    // change route params which then automatically triggers reload in component store
    const path = ['/time-report', id];
    this.store.dispatch(RouterActions.go({ path }));

    // set focus back to select control
    this.selectFocusTrigger$.next();
  }

  navigateToCreateTimeReport(employeeId: string): void {
    const path = ['/time-report/create', employeeId];
    this.store.dispatch(RouterActions.go({ path }))
  }

  onDateChanged(query: { query: TimeSpanQuery, change: 'from' | 'to' }): void {
    this.componentStore.filterChanged$.next(query);
  }

  toggleEditMode(currentState: boolean): void {
    this.componentStore.toggleInsertMode$.next();
    if (currentState) { return }
    this.scrollTrigger$.next();
  }

  onCreate(report: CreateTimeReport, employeeId: string): void {
    this.store.dispatch(TimeReportActions.create({ payload: report, employeeId }))
    this.scrollTrigger$.next();
  }

  onDelete(id: string, employeeId?: string): void {
    this.store.dispatch(TimeReportActions.remove({ id }));
  }

  onUpdate(report: TimeReport, employeeId: string): void {
    this.store.dispatch(TimeReportActions.update({ report }))
  }

  onExport(reports: TimeReport[], employee: Employee, range: TimeSpanQuery): void {
    const fileName = `Arbeitszeiten_${employee.name.replace(' ', '-')}_${range.from.substring(0, 10)}-${range.to.substring(0, 10)}`
    this.exportService.exportAsExcel(reports, fileName);
  }

  private scrollToInput(): void {
    if (!this.scrollElement) { return; }
    this.scrollElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
