import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmployeesFacade } from '@elektro-braun/employees/domain';
import { first } from 'rxjs/operators';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';
import { routeTransition } from '@elektro-braun/shared/ui-components';
import { RouterOutlet } from '@angular/router';
import { AuthActions, AuthFacade } from '@elektro-braun/auth/api';

@Component({
  selector: 'elektro-braun-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeTransition()]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'time-tracking';

  readonly activeRoute$ = new BehaviorSubject<'time-tracking' | 'employees' |  'users'>('time-tracking');
  readonly isAuthenticated$ = this.authFacade.isAuthenticated$;

  constructor(private store: Store, private employeeFacade: EmployeesFacade, private authFacade: AuthFacade) {}

  async navigateTo(route: 'time-tracking' | 'employees' | 'users'): Promise<void> {
    this.activeRoute$.next(route);
    const employeeIds = await this.employeeFacade.ids$.pipe(first()).toPromise() as string[];
    let path: string[] = [];

    switch (route) {
      case 'time-tracking':
        path = ['/time-report', employeeIds[0]];
        break;
      case 'employees':
        path = ['/employees'];
        break;
      case 'users':
        path = ['/users'];
        break;
      default:
        path = ['/employees'];
    }

    this.store.dispatch(RouterActions.go({ path }));
  }

  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated || !outlet.activatedRoute || !outlet.activatedRouteData) { return; }
    return outlet && outlet.activatedRouteData['animationKey'];
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkIfIsAuthenticated());
  }

  ngOnDestroy(): void {
    this.logout();
  }
}
