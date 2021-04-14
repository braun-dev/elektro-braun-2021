import { Injectable } from '@angular/core';
import { distinctUntilSomeChanged, RxState, selectSlice, stateful } from '@rx-angular/state';
import { TimeReport, TimeSpanQuery, TimeTrackingResourceService } from '@elektro-braun/time-tracking/domain';
import { createEntityAdapter } from '@ngrx/entity';
import { DashboardState, DashboardViewModel } from './dashboard.store';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { DateService } from '@elektro-braun/shared/util-date';
import { EmployeesApiService } from '@elektro-braun/employees/api';

const adapter = createEntityAdapter<TimeReport>();

@Injectable()
export class DashboardComponentStore extends RxState<DashboardState> {

  // trigger
  readonly filterChanged$ = new Subject<{ query: TimeSpanQuery; change:  keyof TimeSpanQuery }>();
  readonly toggleInsertMode$ = new Subject<void>();

  // filters out duplicate values
  private readonly distinctFilterChanged$ = this.filterChanged$.asObservable().pipe(
    startWith({ query: {}, change: '' }),
    distinctUntilSomeChanged(['query']),
    stateful(),
    tap(() => 'stateful filter passed')
  )

    // Loads new Time Reports for the currently selected employee or if filterChanged$ emits
  readonly loadReports$: Observable<TimeReport[]> = combineLatest([
    this.employeeApi.selectedEmployee$,
    this.distinctFilterChanged$,
  ]).pipe(
    tap(() => this.get().loaded ? this.setLoading(false) : this.setLoading(true)),
    map(([employee, filter]) => ({ id: employee?.id, filter })),
    filter(({ id }) => !!id),
    switchMap(({ id, filter }) => this.service.load(id, filter?.query))
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
    }))
  )

  constructor(
    private employeeApi: EmployeesApiService,
    private service: TimeTrackingResourceService,
    private store: Store,
    private dateService: DateService
  ) {
    super()
    this.setInitialState()
    this.connect('employees', employeeApi.employees$);
    this.connect('selectedEmployee', employeeApi.selectedEmployee$);
    this.connect(this.loadReports$, this.updateReports);
    this.connect(this.filterChanged$, this.updateDateFilters);
    this.connect(this.toggleInsertMode$, this.updateInsertMode);
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
      fromDate: null,
      showInsert: false,
      toDate: new Date(this.dateService.currentDate()).toISOString()
    }))
  }

  // update helper methods
  private readonly updateReports = (state: DashboardState, reports: TimeReport[]): DashboardState => {
    return adapter.setAll(reports, { ...state, loading: false, loaded: true })
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
