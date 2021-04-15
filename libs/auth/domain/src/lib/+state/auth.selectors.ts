import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, featureKey } from './auth.reducer';

const selectFeature = createFeatureSelector<AuthState>(featureKey);

const selectIsAuthenticated = createSelector(
  selectFeature,
  state => state.isAuthenticated
);

const selectLoading = createSelector(
  selectFeature,
  state => state.loading
);

const selectUser = createSelector(
  selectFeature,
  state => state.user
);

const selectToken = createSelector(
  selectFeature,
  state => state.token
);

export const selectors = {
  selectLoading,
  selectIsAuthenticated,
  selectUser,
  selectToken
}
