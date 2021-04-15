import { Module } from '@nestjs/common';
import { EmployeeModel } from './schemas/employee.schema';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: EmployeeModel, schemaOptions: { collection: 'employees' }}])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
