import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeReport } from '../entities/time-report';
import { CreateTimeReport } from '../entities/create-time-report';
import { Update } from '@ngrx/entity';
import { Time } from '@angular/common';

const ACTION_FEATURE_KEY = 'Time Report';

const load = createAction(
  `[${ACTION_FEATURE_KEY}] Load`,
  props<{ employeeId?: string, from?: string, to?: string}>()
)

const loadSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Load Success`,
  props<{ reports: TimeReport[] }>()
)

const loadFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Load Failure`,
  props<{ error: HttpErrorResponse }>()
)

const remove = createAction(
  `[${ACTION_FEATURE_KEY}] Remove`,
  props<{ id: string }>()
)

const removeSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Remove Success`,
  props<{ id: string }>()
)

const removeFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Remove Failure`,
  props<{ error: HttpErrorResponse }>()
)

const create = createAction(
  `[${ACTION_FEATURE_KEY}] Create`,
  props<{ payload: CreateTimeReport, employeeId: string }>()
)

const createSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Create Success`,
  props<{ report: TimeReport }>()
)

const createFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Create Failure`,
  props<{ error: HttpErrorResponse }>()
)

const update = createAction(
  `[${ACTION_FEATURE_KEY}] Update`,
  props<{ report: TimeReport }>()
)

const updateSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Update Success`,
  props<{ update: Update<TimeReport> }>()
)

const updateFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Update Failure`,
  props<{ error: HttpErrorResponse }>()
)

export const actions = {
  load,
  loadSuccess,
  loadFailure,
  remove,
  removeSuccess,
  removeFailure,
  create,
  createSuccess,
  createFailure,
  update,
  updateSuccess,
  updateFailure
};
