import { Injectable } from '@nestjs/common';
import { EmployeeDocument, EmployeeModel } from './schemas/employee.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {

  constructor(@InjectModel(EmployeeModel.collectionName) private employeeModel: Model<EmployeeDocument>) {}

  async readAll(): Promise<EmployeeModel[]> {
    return this.employeeModel.find().exec();
  }

  async insert(employee: EmployeeModel): Promise<EmployeeModel> {
    const createdEmployee = new this.employeeModel(employee);
    return createdEmployee.save()
  }
}
