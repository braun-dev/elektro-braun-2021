import { TimeReportModel } from './schemas/time-report.schema';
import { TimeReport } from '@elektro-braun/shared/util-data';
import { TimeReportDto } from './dto/time-report.dto';

export class TimeReportConverter {
  static fromModel(timeReportModel: TimeReportModel): TimeReport {
    return {
      id: timeReportModel.id,
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
    return {
      employeeId,
      overtime: dto.bonusTime,
      total: dto.totalHours,
      regular: dto.regularHours,
      sickLeave: dto.sickLeave,
      holiday: dto.holiday,
      description: dto.description,
      compTime: dto.lessTime,
      date: typeof dto.date === 'string' ? new Date(dto.date) : dto.date
    }
  }
}
