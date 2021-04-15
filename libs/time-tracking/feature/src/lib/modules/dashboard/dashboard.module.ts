import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { HourPipe, SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';
import { TableRowComponent } from './table-row/table-row.component';
import { SkeletonTableRowComponent } from './skeleton-table-row/skeleton-table-row.component';
import { ReportStatsComponent } from './report-stats/report-stats.component';

@NgModule({
  declarations: [DashboardComponent, TableComponent, HeaderComponent, TableRowComponent, SkeletonTableRowComponent, ReportStatsComponent],
  imports: [
    CommonModule,
    SharedUiComponentsModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }])
  ],
  providers: [HourPipe]
})
export class DashboardModule { }
