import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmployeeModel } from './schemas/employee.schema';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TimeReportModel } from '../time-report/schemas/time-report.schema';

@Injectable()
export class EmployeeService {

  constructor(@InjectModel(EmployeeModel) private employeeModel: ReturnModelType<typeof EmployeeModel>) {}

  async readAll(): Promise<EmployeeModel[]> {
    return this.employeeModel.find().populate('lastRecordedDate').exec();
  }

  async insert(employee: EmployeeModel): Promise<EmployeeModel> {
    const createdEmployee = new this.employeeModel(employee);
    return createdEmployee.save()
  }

  async updateLastTimeReport(timeReport: TimeReportModel): Promise<boolean> {
    console.log(timeReport);
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(mongoose.Types.ObjectId(timeReport.employeeId), { lastRecordedDate: timeReport.id });
    console.log(updatedEmployee);
    if (!updatedEmployee) {
      throw new InternalServerErrorException('Could not Update last recorded date on Employee');
    }
    return true;
  }
}
