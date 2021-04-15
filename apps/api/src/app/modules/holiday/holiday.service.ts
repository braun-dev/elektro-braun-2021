import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { Holiday } from '@elektro-braun/holidays/domain';

@Injectable()
export class HolidayService {
  constructor(private httpService: HttpService) {}

  loadHolidays(year: number): Observable<AxiosResponse<Holiday[]>> {
    return this.httpService.get<Holiday[]>(`https://date.nager.at/api/v2/publicholidays/${year}/AT`)
  }
}
