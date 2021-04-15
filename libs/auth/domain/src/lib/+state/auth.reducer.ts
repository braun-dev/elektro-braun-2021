import { User } from '@elektro-braun/users/domain';
import { createReducer, on } from '@ngrx/store';
import { actions as AuthActions } from './auth.actions';

export const featureKey = 'auth';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false
}

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.authenticate,
    state => ({ ...state, loading: true })
  ),
  on(
    AuthActions.authenticateSuccess,
    (state, { user, token }) => ({ ...state, loading: false, user, token, isAuthenticated: true })
  ),
  on(
    AuthActions.authenticateFailure,
    state => ({ ...state, loading: false, isAuthenticated: false })
  ),
  on(
    AuthActions.logout,
    state => ({ ...state, loading: false, isAuthenticated: false })
  ),
);
