import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../entities/user';
import { CreateUserPayload } from '../entities/create-user-payload';

const ACTION_FEATURE_KEY = 'Users';

const load = createAction(
  `[${ACTION_FEATURE_KEY}] Load`
)

const loadSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Load Success`,
  props<{ users: User[] }>()
)

const loadFailure = createAction(
  `[${ACTION_FEATURE_KEY}] Load Failure`,
  props<{ error: HttpErrorResponse }>()
)

const create = createAction(
  `[${ACTION_FEATURE_KEY}] Create`,
  props<{ user: CreateUserPayload }>()
)

const createSuccess = createAction(
  `[${ACTION_FEATURE_KEY}] Create Success`,
  props<{ user: User }>()
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
