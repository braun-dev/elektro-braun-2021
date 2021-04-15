import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTimeReportComponent } from './create-time-report.component';
import { RouterModule } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportViewComponent } from './report-view/report-view.component';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  declarations: [CreateTimeReportComponent, InputFormComponent, ReportViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CreateTimeReportComponent }]),
    ReactiveFormsModule,
    SharedUiComponentsModule
  ]
})
export class CreateTimeReportModule { }
