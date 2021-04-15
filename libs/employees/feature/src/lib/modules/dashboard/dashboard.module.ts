import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    SharedUiComponentsModule
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
