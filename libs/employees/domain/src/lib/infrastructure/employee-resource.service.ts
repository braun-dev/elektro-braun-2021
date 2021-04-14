import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../entities/employee';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeResourceService {
  constructor(private http: NetworkService) {}

  load(): Observable<Employee[]> {
    return this.http.get(RESOURCE_PATH).pipe(
      map(response => response)
    )
  }
}
