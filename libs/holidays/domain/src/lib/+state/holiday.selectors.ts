import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, FEATURE_NAME, HolidayState } from './holiday.reducer';

const featureSelector = createFeatureSelector<HolidayState>(FEATURE_NAME);

const { selectAll, selectIds, selectTotal, selectEntities } = adapter.getSelectors(featureSelector);

const selectLoading = createSelector(
  featureSelector,
  state => state.loading
)

const selectLoadedYears = createSelector(
  featureSelector,
  state => state.loadedYears
)

export const selectors = {
  selectLoading,
  selectTotal,
  selectAll,
  selectEntities,
  selectIds,
  selectLoadedYears
}
