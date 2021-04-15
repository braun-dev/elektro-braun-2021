import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, EmployeeState, FEATURE_NAME } from './employee.reducer';
import { routerStateSelector } from '@elektro-braun/shared/util-router-state';
import { Employee } from '@elektro-braun/employees/domain';

const featureSelector = createFeatureSelector<EmployeeState>(FEATURE_NAME);

const { selectAll, selectIds, selectTotal, selectEntities } = adapter.getSelectors(featureSelector);

const selectLoading = createSelector(
  featureSelector,
  state => state.loading || state.status === 'LOADING'
)

const selectSelectedEmployee = createSelector(
  selectEntities,
  routerStateSelector,
  (entities, { state }): Employee | null => (state && state?.params?.id && entities[state?.params.id]) ?? null
)

export const selectors = {
  selectAll,
  selectIds,
  selectTotal,
  selectEntities,
  selectLoading,
  selectState: featureSelector,
  selectSelectedEmployee
}
