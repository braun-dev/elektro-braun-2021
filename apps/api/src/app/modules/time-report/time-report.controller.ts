import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TimeReportService } from './time-report.service';
import { TimeReport } from '@elektro-braun/shared/util-data';
import { TimeReportModel } from './schemas/time-report.schema';
import { TimeReportConverter } from './time-report.converter';
import { TimeReportDto } from './dto/time-report.dto';

@Controller('reports')
export class TimeReportController {
  constructor(private timeReportService: TimeReportService) {}

  @Get(':employeeId')
  async getReports(@Param('employeeId') employeeId: string): Promise<TimeReport[]> {
    const timeReportModels: TimeReportModel[] = await this.timeReportService.readReports(employeeId);
    return timeReportModels.map(reportModel => TimeReportConverter.fromModel(reportModel));
  }

  @Post(':employeeId')
  async createReport(@Param('employeeId') employeeId: string, @Body() timeReportDto: TimeReportDto): Promise<TimeReport> {
    const timeReportModel = TimeReportConverter.fromDtoToModel(timeReportDto, employeeId);
    const createdTimeReportModel = await this.timeReportService.insert(timeReportModel);
    return TimeReportConverter.fromModel(createdTimeReportModel);
  }
}
