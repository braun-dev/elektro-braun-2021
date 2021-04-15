import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { actions as UserActions, User, UsersFacade } from '@elektro-braun/users/domain';
import { actions as RouterActions } from '@elektro-braun/shared/util-router-state';
import { DashboardStore, DashboardViewModel } from './dashboard.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'eb-users-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardStore]
})
export class DashboardComponent implements OnInit {

  vm$: Observable<DashboardViewModel> = this.state.vm$;

  constructor(private state: DashboardStore, private userFacade: UsersFacade) {}

  ngOnInit() {
    this.state.dispatch(UserActions.load());
  }

  selectionChanged(user: User): void {
    this.state.selectOrUnselect(user);
  }

  navigateToCreate(): void {
    this.userFacade.dispatch(RouterActions.go({ path: ['/users/create'] }));
  }
}

