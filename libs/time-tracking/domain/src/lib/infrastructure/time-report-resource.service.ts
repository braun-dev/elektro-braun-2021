import { Injectable } from '@angular/core';
import { NetworkingService } from '@elektro-braun/shared/util-networking';
import { TimeReport } from '../entities/time-report';
import { map } from 'rxjs/operators';
import {
  CREATE_MANY_RESOURCE_PATH,
  CREATE_RESOURCE_PATH,
  DELETE_RESOURCE_PATH,
  RESOURCE_PATH
} from '../time-tracking.api';
import { Observable } from 'rxjs';
import { TimeSpanQuery } from '../entities/time-span-query';
import { HttpParams } from '@angular/common/http';
import { CreateTimeReport } from '../entities/create-time-report';
import { Update } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class TimeTrackingResourceService {
  constructor(private http: NetworkingService) {}

  load(employeeId: string, { from, to }: TimeSpanQuery = {}): Observable<TimeReport[]> {
    let params: HttpParams | undefined = undefined;

    if (from && to) {
      params = new HttpParams().appendAll({ from, to })
    } else if (from && !to) {
      params = new HttpParams().appendAll({ from })
    } else if (!from && to) {
      params = new HttpParams().appendAll({ to })
    }

    return this.http.get<TimeReport[]>(RESOURCE_PATH + '/' + employeeId, params).pipe(
      map(o => o.data)
    )
  }

  save(report: CreateTimeReport, employeeId: string): Observable<TimeReport> {
    return this.http.post<TimeReport, CreateTimeReport>(CREATE_RESOURCE_PATH + '/' + employeeId, report).pipe(
      map(response => response.data)
    )
  }

  delete(id: string, employeeId?: string): Observable<string> {
    return this.http.delete<TimeReport>(DELETE_RESOURCE_PATH, id).pipe(
      map(response => response.data.id)
    );
  }

  update(report: TimeReport): Observable<TimeReport> {
    return this.http.put<TimeReport, TimeReport>(RESOURCE_PATH, report).pipe(
      map(response => response.data)
    )
  }

  saveMany(reports: TimeReport[], employeeId: string): Observable<{ success: boolean; employeeId: string }> {
    return this.http.post(CREATE_MANY_RESOURCE_PATH + '/' + employeeId, reports).pipe(
      map(response => ({
        success: (response.status === 'success' && response.statusCode > 199 && response.statusCode < 300),
        employeeId
      }))
    )
  }
}
