import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { TimeReportService } from './time-report.service';
import { TimeReportModel } from './schemas/time-report.schema';
import { TimeReportConverter } from './time-report.converter';
import { TimeReportDto } from './dto/time-report.dto';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiResponse } from '@elektro-braun/shared/util-networking';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TimeReport } from '@elektro-braun/time-tracking/domain';

@Controller('reports')
export class TimeReportController {
  constructor(private timeReportService: TimeReportService) {}

  @Get(':employeeId')
  async getReports(@Param('employeeId') employeeId: string, @Query() query): Promise<ApiResponse<TimeReport[]>> {
    const { from, to } = query;
    const timeReportModels: TimeReportModel[] = await this.timeReportService.readReports(employeeId, from, to);
    return {
      data: timeReportModels.map(reportModel => TimeReportConverter.fromModel(reportModel)),
      statusCode: 200,
      status: 'success'
    }
  }

  @Post('create/:employeeId')
  async createReport(@Param('employeeId') employeeId: string, @Body() timeReportDto: TimeReportDto): Promise<ApiResponse<TimeReport>> {
    const timeReportModel = TimeReportConverter.fromDtoToModel(timeReportDto, employeeId);
    const createdTimeReportModel = await this.timeReportService.insert(timeReportModel);
    return {
      statusCode: 201,
      data: TimeReportConverter.fromModel(createdTimeReportModel),
      status: 'success'
    }
  }

  @Put()
  async updateReport(@Body() changedReport: TimeReport): Promise<ApiResponse<TimeReport>> {
    const updatedReport = await this.timeReportService.update(changedReport);
    return {
      statusCode: 201,
      data: TimeReportConverter.fromModel(updatedReport),
      status: 'success'
    }
  }

  @Delete('delete/:id')
  async deleteReport(@Param('id') id: string): Promise<ApiResponse<TimeReport>> {
    const deletedReport = await this.timeReportService.delete(id);

    if (!deletedReport) {
      throw new NotFoundException('could not find time report to delete');
    }

    return {
      data: TimeReportConverter.fromModel(deletedReport),
      statusCode: 200,
      status: 'success'
    }
  }

  @Post('create-many/:employeeId')
  async createReports(@Param('employeeId') employeeId: string, @Body() timeReportDtos: TimeReportDto[]): Promise<ApiResponse<TimeReport[]>> {
    const timeReportModels = timeReportDtos.map(dto => TimeReportConverter.fromDtoToModel(dto, employeeId));
    const createdTimeReportModels = await this.timeReportService.insertMany(timeReportModels);
    return {
      data: createdTimeReportModels.map(report => TimeReportConverter.fromModel(report)),
      statusCode: 200,
      status: 'success'
    };
  }
}
