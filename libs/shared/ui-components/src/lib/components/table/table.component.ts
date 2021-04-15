import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';


interface TimeReportCopy {
  readonly id: string;
  employeeId: string;
  date: string;
  totalHours: number;
  regularHours: number;
  bonusTime?: number;
  lessTime?: number;
  sickLeave?: number;
  holiday?: number;
  description?: string;
}

const defaultData: TimeReportCopy[] = [
  {
    id: '1',
    date: '2021-03-24',
    employeeId: '123456',
    totalHours: 9.5,
    regularHours: 8,
    bonusTime: 1.5,
    lessTime: 0,
    holiday: 0,
    sickLeave: 0
  },
  {
    id: '1',
    date: '2021-03-24',
    employeeId: '123456',
    totalHours: 9.5,
    regularHours: 8,
    bonusTime: 1.5,
    lessTime: 0,
    holiday: 0,
    sickLeave: 0
  },
  {
    id: '2',
    date: '2021-03-25',
    employeeId: '123456',
    totalHours: 7,
    regularHours: 8,
    bonusTime: 0,
    lessTime: 1,
    holiday: 0,
    sickLeave: 0
  },
  {
    id: '3',
    date: '2021-03-26',
    employeeId: '123456',
    totalHours: 9,
    regularHours: 8,
    bonusTime: 1,
    lessTime: 0,
    holiday: 0,
    sickLeave: 0
  }
]

const defaultHeaderCellClasses = 'pl-12 pr-6 py-3 w-58 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
const defaultCellClasses = 'px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-28 focus-within:bg-gray-50 border-r border-l border-transparent focus-within:border-gray-200';

@Component({
  selector: 'eb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {

  @Input() dataSource: Observable<T[]> = EMPTY;
  @Input() columns: ReadonlyArray<keyof T | string> = [];
  @Input() hasInput = false;
  @Input() trClass = ''

  // defaults

  /*
  date
totalHours
regularHours
bonusTime
lessTime
sickLeave
holiday
description
   */
  defaultHeaderClasses = defaultHeaderCellClasses;
  defaultCellClasses = defaultCellClasses;
}
