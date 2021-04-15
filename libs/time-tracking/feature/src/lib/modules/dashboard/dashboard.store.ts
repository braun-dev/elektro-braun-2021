import { Injectable } from '@angular/core';
import { distinctUntilSomeChanged, RxState, selectSlice } from '@rx-angular/state';
import {
  actions as TimeReportActions,
  CreateTimeReport,
  TimeReport,
  TimeReportFacade,
  TimeReportStats,
  TimeSpanQuery,
  TimeTrackingResourceService
} from '@elektro-braun/time-tracking/domain';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { DateService } from '@elektro-braun/shared/util-date';
import { Employee, EmployeesApiService } from '@elektro-braun/employees/api';

export interface DashboardViewModel {
  reports: TimeReport[];
  employees: Employee[];
  loading: boolean;
  loaded: boolean;
  selectedEmployee: Employee | null;
  selectedReports: string[];
  updating: boolean;
  showInsert: boolean;
  filter: {
    from: string | null;
    to: string | null;
  }
}

export interface DashboardState extends EntityState<TimeReport>{
  employees: Employee[];
  selectedEmployee: Employee | null;
  selectedReports: string[];
  stats: TimeReportStats;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  showInsert: boolean;
  selectedEmployeeId?: string | null;
  fromDate: string | null;
  toDate: string | null;
}

const adapter = createEntityAdapter<TimeReport>();

@Injectable()
export class DashboardComponentStore extends RxState<DashboardState> {

  // trigger
  readonly insertReport$ = new Subject<{ report: CreateTimeReport, employeeId: string }>();
  readonly deleteReport$ = new Subject<{ id: string; employeeId: string }>();
  readonly filterChanged$ = new Subject<{ query: TimeSpanQuery; change:  keyof TimeSpanQuery }>();
  readonly toggleInsertMode$ = new Subject<void>();

  // filters out duplicate values
  private readonly distinctFilterChanged$: Observable<TimeSpanQuery> = this.filterChanged$.pipe(
    map(filter => filter?.query),
    distinctUntilSomeChanged(['from', 'to']),
    startWith({}),
  )

  private readonly insertReportEffect$ = this.insertReport$.pipe(
    distinctUntilChanged(),
    switchMap(({ report, employeeId }) => this.service.save(report, employeeId))
  )

  private readonly deleteReportEffect$ = this.deleteReport$.pipe(
    distinctUntilChanged(),
    switchMap(({ id, employeeId }) => this.service.delete(id, employeeId))
  )

    // Loads new Time Reports for the currently selected employee or if filterChanged$ emits
  private readonly loadReports$ = combineLatest([
    this.employeeApi.selectedEmployee$,
    this.distinctFilterChanged$,
  ]).pipe(
    tap(([, { from, to }]) => this.store.dispatch(TimeReportActions.load({ from, to })))
  )

  // Compose View Model from State
  readonly vm$: Observable<DashboardViewModel> = this.select(
    selectSlice(['employees', 'loading', 'ids', 'entities', 'selectedEmployee', 'fromDate', 'toDate', 'loaded', 'showInsert']),
    map(({ employees, loading, ids, entities, selectedEmployee, fromDate: from, toDate: to, loaded, showInsert }) => ({
      selectedEmployee: selectedEmployee ?? employees[0],
      selectedEmployeeId: selectedEmployee ? selectedEmployee?.id : employees[0]?.id,
      employees: employees ?? [],
      reports: (ids as string[])?.map(id => entities[id]),
      selectedReports: [],
      updating: loading,
      filter: { from, to },
      showInsert,
      loading,
      loaded
    })),
  )

  readonly stats$: Observable<TimeReportStats> = this.select('stats');
  readonly reports$: Observable<TimeReport[]> = this.reportFacade.timeReports$;
  readonly selectedEmployee$: Observable<Employee> = this.employeeApi.selectedEmployee$;

  constructor(
    private employeeApi: EmployeesApiService,
    private service: TimeTrackingResourceService,
    private store: Store,
    private reportFacade: TimeReportFacade,
    private dateService: DateService
  ) {
    super()
    this.setInitialState()
    this.connect('employees', employeeApi.employees$);
    this.connect('selectedEmployee', employeeApi.selectedEmployee$);
    // this.connect(this.loadReports$, this.updateReports);
    this.hold(this.loadReports$);
    this.connect(this.filterChanged$, this.updateDateFilters);
    this.connect(this.toggleInsertMode$, this.updateInsertMode);
    this.connect(this.insertReportEffect$, this.insertReportHandler);
    this.connect(this.deleteReportEffect$, this.deleteReportHandler);
    this.connect('entities', reportFacade.entities$);
    this.connect('ids', reportFacade.ids$);
    this.connect('stats', reportFacade.stats$);
    this.connect('loading', reportFacade.loading$);
  }

  // sets initial state
  private setInitialState(): void {
    this.set(adapter.getInitialState({
      updating: false,
      loading: false,
      loaded: false,
      employees: [],
      selectedEmployee: null,
      selectedEmployeeId: null,
      selectedReports: [],
      showInsert: false,
      stats: null,
      fromDate: this.dateService.firstDateOfYear(),
      toDate: this.dateService.currentISODate()
    }))
  }

  // update helper methods
  private readonly updateReports = (state: DashboardState, reports: TimeReport[]): DashboardState => {
    return adapter.setAll(reports, { ...state, loading: false, loaded: true })
  }

  private readonly insertReportHandler = (state: DashboardState, report: TimeReport): DashboardState => {
    return adapter.addOne(report, { ...state, loading: false, updating: false });
  }

  private readonly deleteReportHandler = (state: DashboardState, id: string): DashboardState => {
    return adapter.removeOne(id, { ...state, loading: false, updating: false });
  }

  private readonly updateDateFilters =
    (state: DashboardState, dateRange: { query: TimeSpanQuery, change: keyof TimeSpanQuery}): DashboardState => {
      return dateRange.change && dateRange.change === 'from'
        ? { ...state, fromDate: dateRange?.query.from ?? null, toDate: state.toDate }
        : { ...state, fromDate: state.fromDate, toDate: dateRange.query?.to ?? null }
  }

  private readonly updateInsertMode = (state: DashboardState): DashboardState => {
    return { ...state, showInsert: !state.showInsert };
  }

  // helper for setting loading state
  private readonly setLoading = (loading?: boolean) => {
    this.set('loading', () => loading);
  }
}
