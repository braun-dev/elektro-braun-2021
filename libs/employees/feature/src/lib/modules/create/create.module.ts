import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  declarations: [CreateEmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CreateEmployeeComponent }]),
    SharedUiComponentsModule
  ]
})
export class CreateModule { }
