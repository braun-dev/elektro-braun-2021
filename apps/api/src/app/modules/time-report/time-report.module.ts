import { Module } from '@nestjs/common';
import { TimeReportModel } from './schemas/time-report.schema';
import { TimeReportService } from './time-report.service';
import { TimeReportController } from './time-report.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: TimeReportModel, schemaOptions: { collection: 'timereports' }}]),
    EmployeeModule
  ],
  controllers: [TimeReportController],
  providers: [TimeReportService],
})
export class TimeReportModule {}
