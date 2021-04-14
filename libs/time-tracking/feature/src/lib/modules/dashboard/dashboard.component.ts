import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { DashboardViewModel, DashboardStore } from './dashboard.store';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'elektro-braun-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  vm$: Observable<DashboardViewModel> = this.state.vm$;

  private subscription?: Subscription;

  constructor(private state: DashboardStore, private router: Router) { }

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.state.selectedEmployee$,
      this.state.employees$
    ]).pipe(
      distinctUntilChanged(),
      filter(([selected, employees]) => !!selected || employees && employees.length > 0)
    ).subscribe(([selectedEmployee, employees]) => {
        console.log(selectedEmployee, employees);
        this.state.load$(selectedEmployee ? selectedEmployee.id : employees[0].id)
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = undefined;
  }

  select(employeeId: any): void {
    console.log(employeeId.target.value);
    this.state.load$(employeeId.target.value);
  }

  async navigateToCreateTimeReport(): Promise<void> {
    await this.router.navigate(['/create']);
  }

}
