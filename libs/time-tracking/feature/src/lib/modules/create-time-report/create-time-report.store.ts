import { Injectable } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { createEntityAdapter, EntityState, Update } from '@ngrx/entity';
import { TimeReport, TimeTrackingResourceService } from '@elektro-braun/time-tracking/domain';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';
import { Store } from '@ngrx/store';
import { Employee, EmployeesApiService } from '@elektro-braun/employees/api';

interface CreateTimeReportState extends EntityState<TimeReport> {
  totalRegularHours: number;
  totalHours: number;
  totalOvertime: number;
  totalLessHours: number;
  totalSickLeave: number;
  totalHolidays: number;
  totalBalance: number;
  employee: Employee | null;
}

export interface CreateTimeReportViewModel {
  reports: TimeReport[];
  employee: Employee | null;
  summary: {
    totalHours: number;
    overtime: number;
    balance: number;
    lessHours: number;
    sickLeave: number;
  }
}

const adapter = createEntityAdapter<TimeReport>();
const selectors = adapter.getSelectors();

@Injectable()
export class CreateTimeReportStore extends RxState<CreateTimeReportState> {

  // triggers
  readonly addReport$ = new Subject<TimeReport>();
  readonly deleteReport$ = new Subject<TimeReport>();
  readonly updateReport$ = new Subject<Update<TimeReport>>();
  readonly saveReports$ = new Subject();

  // Save
  readonly save$ = this.saveReports$.pipe(
    withLatestFrom(this.select(selectSlice(['entities', 'ids', 'employee']))),
    map(([, { entities, ids, employee }]) => ({ employeeId: employee.id, reports: selectors.selectAll({ entities, ids })})),
    switchMap(({ reports, employeeId }) => this.service.saveMany(reports, employeeId))
  )

  // Compose View Model from state
  readonly vm$: Observable<CreateTimeReportViewModel> = this.select(
    selectSlice(['employee', 'totalOvertime', 'totalHours', 'totalSickLeave', 'totalLessHours', 'entities', 'ids', 'totalBalance']),
    map(({ employee, totalOvertime, totalHours, totalSickLeave, totalLessHours, entities, ids, totalBalance }) => {
      return {
        employee,
        reports: selectors.selectAll({ ids, entities }) ?? [],
        summary: {
          totalHours,
          overtime: totalOvertime,
          lessHours: totalLessHours,
          sickLeave: totalSickLeave,
          balance: totalBalance,
        }
      }
    })
  )

  constructor(
    private employeeApi: EmployeesApiService,
    private service: TimeTrackingResourceService,
    private store: Store
  ) {
    super()
    this.setInitialState()
    this.connect('employee', employeeApi.selectedEmployee$)
    this.connect(this.addReport$, this.addReportUpdater)
    this.connect(this.deleteReport$, this.deleteReportUpdater)
    this.connect(this.updateReport$, this.changeReportUpdater)
    this.hold(this.save$, this.saveResultHandler);
  }

  private setInitialState(): void {
    this.set(adapter.getInitialState({
      totalRegularHours: 0,
      totalHolidays: 0,
      totalHours: 0,
      totalOvertime: 0,
      totalLessHours: 0,
      totalSickLeave: 0,
      totalBalance: 0,
      employee: null
    }))
  }

  // update helper methods which execute when trigger-subject emits
  private readonly addReportUpdater = (state: CreateTimeReportState, report: TimeReport): CreateTimeReportState => {
    return adapter.addOne(report, this.updateStats(state, report, 'add'));
  }

  private readonly deleteReportUpdater = (state: CreateTimeReportState, report: TimeReport): CreateTimeReportState => {
    return adapter.removeOne(report.id, this.updateStats(state, report, 'delete'));
  }

  private readonly changeReportUpdater = (state: CreateTimeReportState, reportUpdate: Update<TimeReport>): CreateTimeReportState => {
    return adapter.updateOne(reportUpdate, state);
  }

  private readonly saveResultHandler = ({ success, employeeId}: { success: boolean, employeeId: string }): void => {
    if (!success) {
      // TODO: Error Message for User
      console.log('ERROR - Todo: Show Error Message');
      return;
    }

    const path = ['time-report', employeeId];
    this.store.dispatch(RouterActions.go({ path }));
  }

  private updateStats(state: CreateTimeReportState, report: TimeReport, action: 'add' | 'delete'): CreateTimeReportState {
    let totalHours = state.totalHours;
    let totalRegularHours = state.totalRegularHours;
    let totalOvertime = state.totalOvertime;
    let totalSickLeave = state.totalSickLeave;
    let totalLessHours = state.totalLessHours;
    let totalHolidays = state.totalHolidays;

    if (action === 'add') {
      totalHours += report.totalHours;
      totalRegularHours += report.regularHours;
      totalOvertime += report.bonusTime;
      totalSickLeave += report.sickLeave;
      totalLessHours += report.lessTime
      totalHolidays += report.totalHours;
    } else {
      totalHours -= report.totalHours;
      totalRegularHours -= report.regularHours;
      totalOvertime -= report.bonusTime;
      totalSickLeave -= report.sickLeave;
      totalLessHours -= report.lessTime
      totalHolidays -= report.totalHours;
    }

    return {
      ...state,
      totalHours,
      totalRegularHours,
      totalOvertime,
      totalLessHours,
      totalHolidays,
      totalBalance: totalHours - totalRegularHours,
      totalSickLeave,
    }
  }
}
