import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@elektro-braun/users/domain';

const actionFeatureKey = 'Auth';

const authenticate = createAction(
  `[${actionFeatureKey}] Authenticate`,
  props<{ email: string; password: string; }>()
);

const authenticateSuccess = createAction(
  `[${actionFeatureKey}] Authenticate Success`,
  props<{ user: User; token: string; }>()
);

const authenticateFailure = createAction(
  `[${actionFeatureKey}] Authenticate Failure`,
  props<{ error: HttpErrorResponse }>()
);

const logout = createAction(
  `[${actionFeatureKey}] Logout`
);

const checkIfIsAuthenticated = createAction(
  `[${actionFeatureKey}] Checking Authentication Token`
);


export const actions = {
  authenticate,
  authenticateSuccess,
  authenticateFailure,
  logout,
  checkIfIsAuthenticated
}
