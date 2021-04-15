import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiComponentsModule } from '@elektro-braun/shared/ui-components';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiComponentsModule,
    RouterModule.forChild([{ path: '', component: CreateComponent }])
  ]
})
export class CreateModule { }
