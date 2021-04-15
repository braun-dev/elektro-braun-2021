import { Injectable } from '@angular/core';
import { TimeReport } from '../entities/time-report';
import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx';

@Injectable({ providedIn: 'root' })
export class TimeReportExportService {
  exportAsExcel(data: TimeReport[], filename: string = 'Arbeitszeiten', workbookName: string = 'Arbeitszeiten'): void {
    const summedData: TimeReport[] = [
      ...data.map(report => ({ ...report, date: report.date.substring(0,10) })),
      {
        id: '',
        date: '',
        employeeId: '',
        bonusTime: data.reduce((a, b) => a + b.bonusTime, 0),
        holiday: data.reduce((a, b) => a + b.holiday, 0),
        regularHours: data.reduce((a, b) => a + b.regularHours, 0),
        totalHours: data.reduce((a, b) => a + b.totalHours, 0),
        lessTime: data.reduce((a, b) => a + b.lessTime, 0),
        sickLeave: data.reduce((a, b) => a + b.sickLeave, 0),
        description: ''
      }
    ];
    const ws: WorkSheet = utils.json_to_sheet(summedData);
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, workbookName);
    writeFile(wb, filename + '.xlsx');
  }
}
