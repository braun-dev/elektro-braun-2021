import { TimeReportModel } from './schemas/time-report.schema';

import { TimeReportDto } from './dto/time-report.dto';
import { stringToNumber } from '../../utils/number-converter';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TimeReport } from '@elektro-braun/time-tracking/domain';

export class TimeReportConverter {
  static fromModel(timeReportModel: TimeReportModel): TimeReport {
    return {
      id: timeReportModel.id,
      employeeId: timeReportModel.employeeId,
      date: timeReportModel.date.toISOString(),
      bonusTime: timeReportModel.overtime ?? 0,
      holiday: timeReportModel.holiday ?? 0,
      regularHours: timeReportModel.regular ?? 0,
      totalHours: timeReportModel.total ?? 0,
      lessTime: timeReportModel.compTime,
      sickLeave: timeReportModel.sickLeave ?? 0,
      description: timeReportModel.description ?? '',
    }
  }

  static fromDtoToModel(dto: TimeReportDto, employeeId: string): TimeReportModel {
    const createDate = (): Date => {
      const dateArray: string[] = (dto.date as string).split('.');
      if (dateArray.length !== 3) { return new Date(); }
      return  new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
    }
    return {
      id: '',
      employeeId,
      date: typeof dto.date === 'string' ? createDate() : dto.date,
      total: typeof dto.totalHours === 'string' ? stringToNumber(dto.totalHours) : dto.totalHours,
      regular: typeof dto.regularHours === 'string' ? stringToNumber(dto.regularHours) : dto.regularHours,
      overtime: typeof dto.bonusTime === 'string' ? stringToNumber(dto.bonusTime) : dto.bonusTime,
      compTime: typeof dto.lessTime === 'string' ? stringToNumber(dto.lessTime) : dto.lessTime,
      sickLeave: typeof dto.sickLeave === 'string' ? stringToNumber(dto.sickLeave) : dto.sickLeave,
      holiday: typeof dto.holiday === 'string' ? stringToNumber(dto.holiday) : dto.holiday,
      description: dto.description,
    }
  }
}
