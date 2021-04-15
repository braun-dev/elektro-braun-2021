import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  Output,
  ViewChild
} from '@angular/core';
import { CreateTimeReport, TimeReport } from '@elektro-braun/time-tracking/domain';
import { combineLatest, Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TableInputComponent } from '@elektro-braun/shared/ui-components';
import { ReportRowStore, ReportRowViewModel } from './table-row.store';
import { TableRowFormService } from './table-row-form.service';
import { distinctUntilChanged, filter, map, tap, withLatestFrom } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { HolidaysApiService } from '@elektro-braun/holidays/api';
import { EmployeesApiService } from '@elektro-braun/employees/api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[ebTableRow]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, ReportRowStore, TableRowFormService]
})
export class TableRowComponent implements AfterViewInit {

  private _mode: 'create' | 'viewOrEdit' = 'viewOrEdit';

  @Input()
  get mode() { return this._mode; }
  set mode(viewMode: 'create' | 'viewOrEdit') {
    this._mode = viewMode;
    this.componentStore.set({ viewMode });
  }

  @Input()
  set report(report: TimeReport) {
    this.componentStore.set({ report });
    this.formService.fill(report);
  }

  @Output() create = new EventEmitter<CreateTimeReport>();
  @Output() update = new EventEmitter<TimeReport>();
  @Output() delete = new EventEmitter<string>();



  @ViewChild('firstControl', { static: false })
  private readonly firstControl: TableInputComponent | null = null;

  @ViewChild('firstHourControl', { static: false })
  private readonly firstHourControl: TableInputComponent | null = null;

  readonly vm$: Observable<ReportRowViewModel> = this.componentStore.vm$;

  readonly focusTrigger$: Subject<boolean> = new Subject<boolean>(); // needed for first click focus
  readonly toggleEditing$: Subject<void> = new Subject<void>();

  readonly form = this.formService.getForm();

  readonly lastRecordedDate$ = this.employeeApi.selectedEmployee$.pipe(
    filter(employee => !!employee && !!employee?.lastRecordedDate),
    tap(({ lastRecordedDate }) => this.formService.setNextDate(lastRecordedDate.date))
  )

  readonly reloadHolidays$ = this.form.get('date')?.valueChanges.pipe(
    filter(() => this.mode === 'create'),
    distinctUntilChanged(),
    tap(date => this.componentStore.checkDate$.next(date)),
    map(date => date?.substring(date?.length - 4, date?.length)),
    withLatestFrom(this.holidaysApi.loadedYears$),
    filter(([dateValue, loadedYears]) =>
      !!dateValue && !dateValue?.includes('.')  && !isNaN(+dateValue) && dateValue?.length === 4 && !loadedYears.includes(dateValue)
    ),
    tap(([year, loadedYears]) => {
      this.holidaysApi.loadYear(+year);
    })
  )

  @HostListener('keydown', ['$event'])
  private onEnter(event: KeyboardEvent): void {
    if (!this.form.valid || this.mode !== 'create' || event.key !== 'Enter') { return; }
    this.createReport();
  }

  constructor(
    private componentStore: ReportRowStore,
    private formService: TableRowFormService,
    private holidaysApi: HolidaysApiService,
    private employeeApi: EmployeesApiService,
    private zone: NgZone,
  ) {
    this.componentStore.set({ report: null, editing: false, holiday: null, viewMode: 'viewOrEdit' })
    this.componentStore.connect(this.toggleEditing$, state => ({ ...state, editing: !state.editing }))
    this.componentStore.hold(this.reloadHolidays$)
    this.componentStore.hold(this.lastRecordedDate$);
    this.componentStore.hold(this.form.valueChanges, this.formService.formatAnUpdateForm)
    this.componentStore.hold(
      combineLatest(([this.form.get('total')?.valueChanges, this.form.get('regular')?.valueChanges])),
      value => this.formService.autofill(value)
    )
  }

  ngAfterViewInit(): void {
    if (this.mode === 'viewOrEdit') { return; }
    this.focusInput();
  }

  edit(wasEditing: boolean): void {
    this.toggleEditingMode(wasEditing);
  }

  createReport(): void {
    if (this.mode !== 'create' || this.form.invalid) {
      window.alert('Bitte überprüfen Sie die Eingabe');
      return;
    }
    this.create.emit(this.formService.getCreateTimeReport());
    this.focusInput();
    this.formService.resetToNext();
  }

  updateReport(existingReport: TimeReport, wasEditing: boolean): void {
    if (this.mode !== 'viewOrEdit') { return; }
    this.update.emit({ ...existingReport, ...this.formService.getPartialTimeReport() })
    this.toggleEditingMode(wasEditing);
  }

  deleteReport(id: string): void {
    if (this.mode !== 'viewOrEdit') { return; }
    this.delete.emit(id);
  }

  private toggleEditingMode(wasEditing: boolean): void {
    this.toggleEditing$.next();
    if (wasEditing) { return; }
    this.focusInput();
  }

  nextDate(): void {
    this.formService.nextDate();
    this.componentStore.checkDate$.next(this.form.value?.date);
  }

  prevDate(): void {
    this.formService.previousDate();
    this.componentStore.checkDate$.next(this.form.value?.date);
  }

  private focusInput(): void {
    if (this._mode === 'create' && this.firstControl && this.firstControl?.element) {
      this.focusTrigger$.next(true);
      this.firstControl?.element?.nativeElement?.focus();
      return;
    }

    if (this._mode === 'viewOrEdit' && this.firstHourControl && this.firstHourControl?.element) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => this.zone.run(() => {
          this.focusTrigger$.next(true);
          this.firstHourControl?.element?.nativeElement?.focus();
        }), 40)
      })
    }
  }
}
