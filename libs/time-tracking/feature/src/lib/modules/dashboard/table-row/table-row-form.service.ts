import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTimeReport, TimeReport } from '@elektro-braun/time-tracking/domain';
import { HourPipe } from '@elektro-braun/shared/ui-components';
import { DateService } from '@elektro-braun/shared/util-date';

@Injectable()
export class TableRowFormService {

  private readonly form = this.createForm();

  constructor(
    private fb: FormBuilder,
    private hourFormatter: HourPipe,
    private dateService: DateService,
  ) { }

  private static stringToNumber(stringValue: string | null | undefined): number {
    if (!stringValue) {
      return 0;
    }

    if (stringValue && stringValue?.includes(',')) {
      const replacedValue = stringValue.replace(',', '.');
      return (isNaN(+replacedValue)) ? 0 : +replacedValue;
    }

    return (isNaN(+stringValue)) ? 0 : +stringValue;
  }

  getForm(): FormGroup {
    return this.form;
  }

  getCreateTimeReport(): CreateTimeReport {
    return {
      date: this.form.value.date,
      totalHours: TableRowFormService.stringToNumber(this.form.value.total ?? 0),
      regularHours: TableRowFormService.stringToNumber(this.form.value.regular ?? 0),
      bonusTime: TableRowFormService.stringToNumber(this.form.value.overtime ?? 0),
      lessTime: TableRowFormService.stringToNumber(this.form.value.lessHours ?? 0),
      holiday: TableRowFormService.stringToNumber(this.form.value.holiday ?? 0),
      sickLeave: TableRowFormService.stringToNumber(this.form.value.sickLeave ?? 0)
    }
  }

  getPartialTimeReport(): Partial<TimeReport> {
    return {
      date: this.form.value.date,
      totalHours: TableRowFormService.stringToNumber(this.form.value.total ?? 0),
      regularHours: TableRowFormService.stringToNumber(this.form.value.regular ?? 0),
      bonusTime: TableRowFormService.stringToNumber(this.form.value.overtime ?? 0),
      lessTime: TableRowFormService.stringToNumber(this.form.value.lessHours ?? 0),
      holiday: TableRowFormService.stringToNumber(this.form.value.holiday ?? 0),
      sickLeave: TableRowFormService.stringToNumber(this.form.value.sickLeave ?? 0)
    }
  }

  autofill([total, regular]): void {
    if (total && regular && this.form) {
      const diff = TableRowFormService.stringToNumber(total) - TableRowFormService.stringToNumber(regular);
      if (diff > 0) {
        this.form.patchValue({
          overtime: this.formatInput(diff),
          lessHours: null,
          holiday: null,
          sickLeave: null
        }, { onlySelf: true, emitEvent: false })
      } else if (diff < 0) {
        this.form.patchValue({ lessHours: this.formatInput(diff), overtime: null }, { onlySelf: true, emitEvent: false })
      } else {
        this.form.patchValue({
          overtime: null,
          lessHours: null,
          holiday: null,
          sickLeave: null
        }, { onlySelf: true, emitEvent: false })
      }
    }
  }

  setNextDate(previousDate: string): void {
    const nextDate = this.dateService.nextDate(previousDate, true);
    if (!nextDate) { return }
    this.form.patchValue({ date: nextDate }, { onlySelf: true, emitEvent: false });
  }

  resetToNext(): void {
    const parts = (this.form.value?.date as string)?.split('.');
    if (!parts || parts?.length !== 3) { return }
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const nextDate = formattedDate ? this.dateService.nextDate(formattedDate) : this.dateService.currentISODate();
    this.form.reset({ date: nextDate });
  }

  previousDate(): void {
    const parts = (this.form.value?.date as string)?.split('.');
    if (!parts || parts?.length !== 3) { return }
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const prevDate = formattedDate ? this.dateService.prevDate(formattedDate) : this.dateService.currentISODate();
    this.form.patchValue({ date: prevDate }, { emitEvent: false, onlySelf: true });
  }

  nextDate(): void {
    const parts = (this.form.value?.date as string)?.split('.');
    if (!parts || parts?.length !== 3) { return }
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const nextDate = formattedDate ? this.dateService.nextDate(formattedDate) : this.dateService.currentISODate();
    this.form.patchValue({ date: nextDate }, { emitEvent: false, onlySelf: true });
  }

  fill(report: TimeReport | null): void {
    if (report === null) {
      this.resetToNext();
      return;
    }

    this.form.patchValue({
      date: report?.date ?? this.dateService.format(DateService.getCurrentISODate(), 'dd.MM.yyyy'),
      total: this.formatInput(report?.totalHours),
      regular: this.formatInput(report?.regularHours),
      overtime: this.formatInput(report?.bonusTime),
      lessHours: this.formatInput(report?.lessTime),
      holiday: this.formatInput(report?.holiday),
      sickLeave: this.formatInput(report?.sickLeave)
    }, { emitEvent: false, onlySelf: true });
  }

  readonly formatAnUpdateForm = (formValue: never) => {
    this.formatAndUpdateDate(formValue['date']);
    this.formatValueAndUpdateControl(formValue, 'total');
    this.formatValueAndUpdateControl(formValue, 'regular');
    this.formatValueAndUpdateControl(formValue, 'overtime');
    this.formatValueAndUpdateControl(formValue, 'lessHours');
    this.formatValueAndUpdateControl(formValue, 'holiday');
    this.formatValueAndUpdateControl(formValue, 'sickLeave');
  }

  private formatAndUpdateDate(dateInput: string): void {
    let date = this.dateService.format(this.dateService.currentDate(), 'dd.MM.yyyy');
    const arrayInput = dateInput.split('.');

    if (arrayInput && arrayInput?.length === 3) {
      return;
    }

    if (dateInput.length === 6 && !isNaN(+dateInput)) {
      date = dateInput.substring(0, 2) + '.' + dateInput.substring(2, 4) + '.' + '20' + dateInput.substring(4, 6);
    }

    if (dateInput.length === 8 && !isNaN(+dateInput)) {
      date = dateInput.substring(0, 2) + '.' + dateInput.substring(2, 4) + '.' + + dateInput.substring(4);
    }

    this.form.get('date').patchValue(date);
  }

  private readonly formatValueAndUpdateControl = (formValue: never, controlName: string) => {
    if (formValue[controlName]) {
      const formattedValue = this.formatInput(formValue[controlName]);
      if (formValue[controlName] === formattedValue || this.form.get(controlName)?.value === formattedValue) { return; }
      this.form.get(controlName)?.patchValue(formattedValue);
    }
  }

  private formatInput(value: string | number): string {
    return this.hourFormatter.transform(value);
  }

  private createForm(lastRecordedDate?: string): FormGroup {
    const date = lastRecordedDate
        ? this.dateService.nextDate(lastRecordedDate, true)
        : this.dateService.format(DateService.getCurrentDate(), 'dd.MM.yyyy')

    return this.fb.group({
      date: [date, Validators.required],
      total: ['', Validators.required],
      regular: ['', Validators.required],
      overtime: [''],
      lessHours: [''],
      holiday: [''],
      sickLeave: [''],
    }, { updateOn: 'blur' })
  }
}
