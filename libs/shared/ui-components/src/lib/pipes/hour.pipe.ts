import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

const POSITIVE_NUMERIC_REGEX = /[-]{0,1}[\d]*[.|,]{0,1}[\d]+/g;

@Pipe({
  name: 'hour',
  pure: true,
})
export class HourPipe implements PipeTransform {

  private static trimAndRoundDecimals(value: number, digitsInfo: string = '1.2-2'): string {
    return formatNumber(value, 'de-AT', digitsInfo)
  }

  private static isOver24Hours(value: string): boolean {
    return value.length === 2 && value.startsWith('24')
      || value.length === 2 && value.startsWith('25')
      || value.length === 2 && value.startsWith('26')
      || value.length === 2 && value.startsWith('27')
      || value.length === 2 && value.startsWith('28')
      || value.length === 2 && value.startsWith('29')
      || value.length === 2 && value.startsWith('3')
      || value.length === 2 && value.startsWith('4')
      || value.length === 2 && value.startsWith('5')
      || value.length === 2 && value.startsWith('6')
      || value.length === 2 && value.startsWith('7')
      || value.length === 2 && value.startsWith('8')
      || value.length === 2 && value.startsWith('9')
  }

  private static formatInput(inputValue: string, digitsInfo: string = '1.2-2'): string | null {
    const value = inputValue.trim(); // remove trailing whitespaces at beginning and end
    const matches = value.match(POSITIVE_NUMERIC_REGEX);
    let result = '';

    if (!matches || matches.length < 1) {
      return null;
    }

    const match = matches[0].replace('-', '');

    result = (match.startsWith('.') || match.startsWith(',') || match.startsWith('-') || (!isNaN(+match) && +match < 0))
      ? match.substring(1, match.length)
      : match;

    if (result === '' || isNaN(+result.replace(',', '.'))) {
      return HourPipe.trimAndRoundDecimals(0, digitsInfo);
    }

    if (result.includes(',')) {
      const [valueBeforeSeparator, ] = result.split(',');
      const isTooHigh = HourPipe.isOver24Hours(valueBeforeSeparator);

      if (valueBeforeSeparator && (valueBeforeSeparator?.length > 2 || isTooHigh)) {
        return HourPipe.trimAndRoundDecimals(0, digitsInfo);
      }
    }

    if (result.includes('.')) {
      const [valueBeforeSeparator, ] = result.split('.');
      const isTooHigh = HourPipe.isOver24Hours(valueBeforeSeparator);
      if (valueBeforeSeparator && (valueBeforeSeparator?.length > 2 || isTooHigh)) {
        return HourPipe.trimAndRoundDecimals(0, digitsInfo);
      }
    }

    return HourPipe.trimAndRoundDecimals(+result.replace(',', '.'), digitsInfo);
  }

  transform(value: string | number, digitsInfo: string = '1.2-2'): string {
    const formattedValue = (typeof value === 'string') ? HourPipe.formatInput(value) : HourPipe.formatInput(`${value}`);
    return !formattedValue ? HourPipe.trimAndRoundDecimals(0, digitsInfo) : formattedValue;
  }
}
