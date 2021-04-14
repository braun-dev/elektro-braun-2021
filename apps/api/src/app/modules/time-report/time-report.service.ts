import { Injectable } from '@nestjs/common';
import { TimeReportDocument, TimeReportModel } from './schemas/time-report.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TimeReportService {
  constructor(@InjectModel(TimeReportModel.collectionName) private timeReportModel: Model<TimeReportDocument>) {}

  async readReports(employeeId: string): Promise<TimeReportModel[]> {
    return  this.timeReportModel.find({ employeeId }).exec();
  }

  async insert(model: TimeReportModel): Promise<TimeReportModel> {
    const createdTimeReport = new this.timeReportModel(model);
    return createdTimeReport.save();
  }
}
