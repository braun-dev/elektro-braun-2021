import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SelectComponent } from './components/select/select.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { TableComponent } from './components/table/table.component';
import { TableInputComponent } from './components/table/table-input/table-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberCellComponent } from './components/table-cells/number-cell/number-cell.component';
import { DateCellComponent } from './components/table-cells/date-cell/date-cell.component';
import { DifferenceCellComponent } from './components/table-cells/difference-cell/difference-cell.component';
import { HourPipe } from './pipes/hour.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { FormHeaderDirective } from './components/form-container/directives/form-header.directive';
import { FormGroupDirective } from './components/form-container/directives/form-group.directive';
import { InputDirective } from './directives/input.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CdkTableModule, ScrollingModule],
  declarations: [
    ButtonDirective,
    DashboardComponent,
    SelectComponent,
    OutsideClickDirective,
    TableComponent,
    TableInputComponent,
    NumberCellComponent,
    DateCellComponent,
    DifferenceCellComponent,
    HourPipe,
    FormContainerComponent,
    FormHeaderDirective,
    FormGroupDirective,
    InputDirective
  ],
  exports: [
    ButtonDirective,
    SelectComponent,
    OutsideClickDirective,
    TableComponent,

    // Cells
    TableInputComponent,
    DateCellComponent,
    NumberCellComponent,
    DifferenceCellComponent,

    // Pipes
    HourPipe,

    // Directives
    FormGroupDirective,
    FormHeaderDirective,
    FormContainerComponent,
    InputDirective
  ]
})
export class SharedUiComponentsModule {}
