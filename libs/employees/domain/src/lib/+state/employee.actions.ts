import { createAction, props } from '@ngrx/store';
import { Employee } from '../entities/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateEmployeePayload } from '../entities/create-employee-payload';

const ACTION_FEATURE_KEY = 'Employee';

const load = createAction(
  `[${ACTION_FEATURE_KEY}] Load`
)

const loadSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Load Success`,
  props<{ employees: Employee[] }>()
)

const loadFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Load Failure`,
  props<{ error: HttpErrorResponse }>()
)

const create = createAction(
  `[${ACTION_FEATURE_KEY}] Create`,
  props<{ employeePayload: CreateEmployeePayload }>()
)

const createSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Create Success`,
  props<{ employee: Employee }>()
)

const createFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Create Failure`,
  props<{ error: HttpErrorResponse }>()
)

export const actions = {
  load,
  loadSuccess,
  loadFailure,
  create,
  createSuccess,
  createFailure
};
