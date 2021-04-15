import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Holiday } from '../entities/holiday';
import { createReducer, on } from '@ngrx/store';
import { actions as HolidayActions } from './holiday.actions';

export const FEATURE_NAME = 'holidays';

export interface HolidayState extends EntityState<Holiday> {
  loaded: boolean;
  loading: boolean;
  error: string | null;
  loadedYears: number[];
}

export const adapter = createEntityAdapter<Holiday>({
  selectId: (holiday: Holiday) => holiday.date
})

export const initialState = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  loadedYears: []
})

export const reducer = createReducer(
  initialState,
  on(
    HolidayActions.loadForYear,
    (state) => ({ ...state, loading: true, loaded: false, error: null }),
  ),
  on(
    HolidayActions.loadForYearSuccess,
    (state, { holidays, year }) => adapter.setAll(holidays, { ...state, loadedYears: [year], loading: false, loaded: true, error: null })
  ),
  on(
    HolidayActions.loadForYearFailure,
    (state, { error }) => ({ ...state, loaded: false, loading: false, error: error ? error?.status ?? error?.message : 'Error' })
  )
);
