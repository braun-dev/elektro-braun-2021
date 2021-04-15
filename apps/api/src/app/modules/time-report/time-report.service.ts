import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TimeReportModel } from './schemas/time-report.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { EmployeeService } from '../employee/employee.service';
import { Update } from '@ngrx/entity';
import { TimeReport } from '@elektro-braun/time-tracking/domain';

@Injectable()
export class TimeReportService {
  constructor(
    private employeeService: EmployeeService,
    @InjectModel(TimeReportModel) private timeReportModel: ReturnModelType<typeof TimeReportModel>
  ) {}

  async readReports(employeeId: string, from?: string, to?: string): Promise<TimeReportModel[]> {
    if (from && !to) {
      return this.timeReportModel.find({ employeeId, date: { $gte: from }}).sort({ date: 1 }).exec();
    } else if (!from && to) {
      return this.timeReportModel.find({ employeeId, date: { $lte: to }}).sort({ date: 1 }).exec();
    } else if (from && to) {
      return this.timeReportModel.find({ employeeId, date: { $gte: from, $lte: to }}).sort({ date: 1 }).exec();
    } else {
      return this.timeReportModel.find({ employeeId }).sort({ date: 1 }).exec();
    }
  }

  async insert(model: TimeReportModel): Promise<TimeReportModel> {
    const createdTimeReport = new this.timeReportModel(model);
    const savedReport: TimeReportModel = await createdTimeReport.save();
    const updated = await this.employeeService.updateLastTimeReport(savedReport);
    if (!updated) { throw new InternalServerErrorException('Could not Update TimeReport on User'); }
    return savedReport;
  }

  async delete(id: string): Promise<TimeReportModel> {
    return this.timeReportModel.findByIdAndDelete(id).exec();
  }

  async update({ id, ...update }: TimeReport): Promise<TimeReportModel> {
    return this.timeReportModel.findByIdAndUpdate(id, {
      total: update.totalHours,
      regular: update.regularHours,
      compTime: update.lessTime,
      overtime: update.bonusTime,
      sickLeave: update.sickLeave,
      holiday: update.holiday,
      description: update.description
    }, { new: true }).exec();
  }

  async insertMany(models: TimeReportModel[]): Promise<TimeReportModel[]> {
    const insertedTimeReports: TimeReportModel[] = await this.timeReportModel.insertMany(models);
    if (!insertedTimeReports) {
      throw new InternalServerErrorException('Could not save models');
    }
    const latestTimeReport = insertedTimeReports.sort((a, b) => (a.date as any) - (b.date as any))[0]
    const updated = await this.employeeService.updateLastTimeReport(latestTimeReport);
    if (!updated) { throw new InternalServerErrorException('Could not Update TimeReport on User'); }
    return insertedTimeReports;
  }
}
