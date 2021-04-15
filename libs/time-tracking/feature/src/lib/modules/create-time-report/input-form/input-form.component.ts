import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateService } from '@elektro-braun/shared/util-date';
import { CreateTimeReport } from '@elektro-braun/time-tracking/domain';

@Component({
  selector: 'elektro-braun-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {

  @Input() date: string | null = null;
  @Output() record = new EventEmitter<CreateTimeReport>()

  form = this.fb.group({
    date: [this.dateService.currentDate(), Validators.required],
    total: [0, Validators.required],
    regular: [0, Validators.required],
    overtime: [0, Validators.min(0)],
    lessTime: [0, Validators.min(0)],
    holiday: [0, Validators.min(0)],
    sickLeave: [0, Validators.min(0)],
    note: [''],
  })

  get dateValue(): string {
    return this.form.value.date;
  }

  get totalValue(): number {
    return this.form.value.total;
  }

  get regularValue(): number {
    return this.form.value.regular;
  }

  get overtimeValue(): number {
    return this.form.value.overtime ?? 0;
  }

  get lessTimeValue(): number {
    return this.form.value.lessTime ?? 0;
  }

  get holidayValue(): number {
    return this.form.value.holiday ?? 0;
  }

  get sickLeaveValue(): number {
    return this.form.value.sickLeave ?? 0;
  }

  get noteValue(): string {
    return this.form.value.note ?? '';
  }

  constructor(private fb: FormBuilder, private dateService: DateService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  onRecord(): void {
    if (this.form.invalid) {
      window.alert('Bitte kontrollieren Sie die Eingabe!');
      return;
    }

    const record = this.getFormValues();
    console.log('record: ', record);
    this.record.emit(record);
  }

  private getFormValues(): CreateTimeReport {
    return {
      date: this.dateValue,
      totalHours: this.totalValue,
      regularHours: this.regularValue,
      bonusTime: this.overtimeValue,
      lessTime: this.lessTimeValue,
      sickLeave: this.sickLeaveValue,
      holiday: this.holidayValue,
      description: this.noteValue
    }
  }
}
