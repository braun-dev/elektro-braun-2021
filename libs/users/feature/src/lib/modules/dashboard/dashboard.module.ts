import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedUiComponentsModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }])
  ]
})
export class DashboardModule { }
