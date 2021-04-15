import { Injectable } from '@angular/core';
import { NetworkingService } from '@elektro-braun/shared/util-networking';
import { Observable } from 'rxjs';
import { Holiday } from '../entities/holiday';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HOLIDAY_PATH } from '../holidays-domain.api';

@Injectable({ providedIn: 'root' })
export class HolidayResourceService {
  constructor(private httpService: NetworkingService) {}

  load(year: number): Observable<Holiday[]> {
    const params = new HttpParams().append('year', `${year}`);
    return this.httpService.get<Holiday[]>(HOLIDAY_PATH, params).pipe(
      map(response => response.data)
    )
  }
}
