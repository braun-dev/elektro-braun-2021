import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeReportModel, TimeReportSchema } from './schemas/time-report.schema';
import { TimeReportService } from './time-report.service';
import { TimeReportController } from './time-report.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeReportModel.collectionName, schema: TimeReportSchema }
    ])
  ],
  controllers: [TimeReportController],
  providers: [TimeReportService],
})
export class TimeReportModule {}
