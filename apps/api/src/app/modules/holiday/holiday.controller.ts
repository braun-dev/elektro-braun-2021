import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@elektro-braun/shared/util-networking';
import { Holiday } from '@elektro-braun/holidays/domain';
import { HolidayService } from './holiday.service';

@Controller('holidays')
export class HolidayController {

  constructor(private holidayService: HolidayService) {}

  @Get()
  async loadHolidays(@Query('year') year: string): Promise<ApiResponse<Holiday[]>> {
    const holidays = await this.holidayService.loadHolidays(+year).toPromise();
    return {
      data: holidays.data,
      statusCode: 200,
      status: 'success'
    };
  }
}
