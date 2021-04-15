import { Injectable } from '@angular/core';
import { Employee, EmployeesFacade } from '@elektro-braun/employees/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {

  readonly employees$: Observable<Employee[]> = this.facade.employees$;
  readonly selectedEmployee$: Observable<Employee | null> = this.facade.selectedEmployee$;
  readonly loading$: Observable<boolean> = this.facade.loading$;
  readonly entities$ = this.facade.entities$;
  readonly ids$ = this.facade.ids$;

  constructor(private facade: EmployeesFacade) {}
}
