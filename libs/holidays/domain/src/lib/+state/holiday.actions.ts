import { createAction, props } from '@ngrx/store';
import { Holiday } from '../entities/holiday';
import { HttpErrorResponse } from '@angular/common/http';

const actionFeatureKey = 'Holiday';

const loadForYear = createAction(
  `[${actionFeatureKey}] Load For Year`,
  props<{ year: number }>()
);

const loadForYearSuccess = createAction(
  `[${actionFeatureKey}] Load For Year Success`,
  props<{ holidays: Holiday[], year: number }>()
);

const loadForYearFailure = createAction(
  `[${actionFeatureKey}] Load For Year Failure`,
  props<{ error: HttpErrorResponse }>()
);

export const actions = {
  loadForYear,
  loadForYearSuccess,
  loadForYearFailure
}
