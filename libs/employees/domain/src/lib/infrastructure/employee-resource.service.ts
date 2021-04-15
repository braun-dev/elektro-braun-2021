import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../entities/employee';
import { map } from 'rxjs/operators';
import { NetworkingService } from '@elektro-braun/shared/util-networking';
import { RESOURCE_PATH } from '../employees-domain.api';
import { CreateEmployeePayload } from '@elektro-braun/employees/domain';

@Injectable({ providedIn: 'root' })
export class EmployeeResourceService {
  constructor(private http: NetworkingService) {}

  load(): Observable<Employee[]> {
    return this.http.get<Employee[]>(RESOURCE_PATH).pipe(
      map(response => response.data)
    );
  }

  create(payload: CreateEmployeePayload): Observable<Employee> {
    return  this.http.post<Employee, CreateEmployeePayload>(RESOURCE_PATH, payload).pipe(
      map(response => response.data)
    );
  }
}
