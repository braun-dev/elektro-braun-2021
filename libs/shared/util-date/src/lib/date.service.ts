import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DateService {

  constructor() {}

  static getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${year}-${formattedMonth}-${formattedDay}`
  }

  static getCurrentISODate(): string {
    return new Date(DateService.getCurrentDate()).toISOString();
  }

  static getFirstISODateOfYear(): string {
    const date = new Date();
    return new Date(date.getFullYear(), 0, 1).toISOString();
  }

  static getCurrentYear(): number {
    const today = new Date();
    return today.getFullYear();
  }

  private static getCurrentDay(): string {
    const today = new Date();
    const day = today.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  }

  private static getCurrentMonth(): string {
    const today = new Date();
    const month = today.getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  private static toIsoDateString(value: string): string {
    try {
      if (!value || value.length < 1) { return ''; }
      const dateParts = value.split('.');

      if (dateParts.length > 2) {
        return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();
      }

      if (dateParts.length === 2) {
        return new Date(`${DateService.getCurrentYear()}-${dateParts[1]}-${dateParts[0]}`).toISOString();
      }

      if (dateParts.length === 1 && dateParts[0].startsWith('m') || dateParts.length === 1 && dateParts[0].startsWith('M')) {
        const month = dateParts[0].match(/[^0-9]/)[0];
        const isLengthCorrect = month.length <= 2;
        const valid = month.length === 2 ? (month.startsWith('0') || month.startsWith('1')) : !month.startsWith('0');
        if (!valid || !isLengthCorrect) { return ''; }
        return new Date(`${DateService.getCurrentYear()}-${month}-${DateService.getCurrentDay()}`).toISOString();
      }

      if (dateParts.length === 1 && dateParts[0].startsWith('d') || dateParts.length === 1 && dateParts[0].startsWith('D')) {
        const day = dateParts[0].match(/[^0-9]/)[0];
        const isLengthCorrect = day.length <= 2;
        const valid = day.length === 2
          ? (day.startsWith('0') || day.startsWith('1') || day.startsWith('2') || day.startsWith('30') || day.startsWith('31'))
          : !day.startsWith('1');
        if (!valid || !isLengthCorrect) { return ''; }
        return new Date(`${DateService.getCurrentYear()}-${DateService.getCurrentMonth()}-${day}`).toISOString();
      }

    } catch (e) {
      console.log('COULD NOT CREATE DATE STRING!!!')
    }
  }

  currentDate(): string {
    return DateService.getCurrentDate();
  }

  currentISODate(): string {
    return new Date(DateService.getCurrentDate()).toISOString();
  }

  toISOString(value: string): string {
    return DateService.toIsoDateString(value);
  }

  firstDateOfYear(): string {
    const date = new Date();
    return new Date(date.getFullYear(), 0, 1).toISOString();
  }

  nextDate(currentDate: string, formatted = true): string {
    const currDate = new Date(currentDate);
    const newDate = currDate.setDate(currDate?.getDate() + 1);
    return formatted && newDate ? formatDate(new Date(newDate), 'dd.MM.yyyy', 'de-AT') : new Date(newDate)?.toISOString();
  }

  prevDate(currentDate: string, formatted = true): string {
    const currDate = new Date(currentDate);
    const newDate = currDate.setDate(currDate?.getDate() - 1);
    return formatted && newDate ? formatDate(new Date(newDate), 'dd.MM.yyyy', 'de-AT') : new Date(newDate)?.toISOString();
  }

  format(date: string, format: string): string {
    try {
      return formatDate(date, format, 'de-AT');
    } catch (e) {
      console.log('Datum konnte nicht konvertiert werden!');
    }
  }
}
