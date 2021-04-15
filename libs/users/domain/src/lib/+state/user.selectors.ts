import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, FEATURE_NAME, UserState } from './user.reducer';

const featureSelector = createFeatureSelector<UserState>(FEATURE_NAME);

const { selectAll, selectIds, selectTotal, selectEntities } = adapter.getSelectors<UserState>(featureSelector);

const selectLoading = createSelector(
  featureSelector,
  state => state.loading || state.status === 'LOADING'
)

export const selectors = {
  selectAll,
  selectIds,
  selectTotal,
  selectEntities,
  selectLoading,
}
