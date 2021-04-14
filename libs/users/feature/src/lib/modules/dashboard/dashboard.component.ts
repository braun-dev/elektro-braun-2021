import { Component, OnInit} from '@angular/core';
import { DashboardFacade } from '@elektro-braun/users/domain';

@Component({
  selector: 'eb-users-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



    constructor(private dashboardFacade: DashboardFacade) {
    }


    ngOnInit() {
    }

}

