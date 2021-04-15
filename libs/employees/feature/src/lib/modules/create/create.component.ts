import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CreateEmployeeFormService } from './create-employee-form.service';
import { FormArray, FormGroup } from '@angular/forms';
import { EmployeeActions } from '@elektro-braun/employees/api';
import { Store } from '@ngrx/store';
import { REGISTERED_ACTION_TYPES } from '@ngrx/store/src/globals';

@Component({
  selector: 'elektro-braun-create-employee',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [CreateEmployeeFormService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEmployeeComponent implements OnInit {

  form = this.formService.createForm();

  get personalInfoForm(): FormGroup {
    return this.formService.personalInfoGroup;
  }

  get companyInfoForm(): FormGroup {
    return this.formService.companyInfoGroup;
  }

  get workingHours(): FormGroup {
    return this.formService.workingHoursGroup;
  }

  get genderArray(): FormArray {
    return this.formService.personalInfoGroup?.controls?.gender as FormArray;
  }

  constructor(
    private readonly store: Store,
    private readonly formService: CreateEmployeeFormService
  ) { }

  ngOnInit(): void {
    return
  }

  createEmployee(): void {
    if (this.form.invalid) {
      alert('Bitte überprüfen Sie die Eingabe! Mindestens ein erforderliches Feld ist nicht korrekt ausgefüllt!');
      return;
    }

    const employeePayload = this.formService.formValue;
    this.store.dispatch(EmployeeActions.create({ employeePayload }));
  }
}
