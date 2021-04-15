import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { actions as TimeReportActions } from './time-report.actions';
import { createReducer, on } from '@ngrx/store';
import { TimeReport } from '../entities/time-report';

export const FEATURE_NAME = 'timeReport';

export interface TimeReportState extends EntityState<TimeReport> {
  loaded: boolean;
  loading: boolean;
  updating: boolean;
  from: string | null;
  to: string | null;
  status: 'IDLE' | 'LOADING' | 'UPDATING' | 'ERROR',
  error: string | null;
}

export const adapter = createEntityAdapter<TimeReport>()

export const initialState = adapter.getInitialState({
  loaded: false,
  loading: false,
  updating: false,
  from: null,
  to: null,
  status: 'IDLE',
  error: null
})

export const reducer = createReducer(
  initialState,
  on(
    TimeReportActions.load,
    (state, { from, to }) => adapter.removeAll(({ ...state, from, to, loading: true, status: 'LOADING', error: null }))
  ),
  on(
    TimeReportActions.loadSuccess,
    (state, { reports }) => adapter.setAll(reports, ({
      ...state,
      loaded: true,
      loading: false,
      status: 'IDLE',
      error: null
    }))
  ),
  on(
    TimeReportActions.loadFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error?.message ?? error?.statusText,
      status: 'ERROR'
    })
  ),
  on(
    TimeReportActions.remove,
    (state) => ({...state, updating: true, status: 'UPDATING' })
  ),
  on(
    TimeReportActions.removeSuccess,
    (state, { id }) => adapter.removeOne(id, { ...state, updating: false, status: 'IDLE' })
  ),
  on(
    TimeReportActions.removeFailure,
    (state, { error }) => ({
      ...state,
      updating: false,
      error: error?.message ?? error?.statusText,
      status: 'ERROR'
    })
  ),
  on(
    TimeReportActions.create,
    (state) => ({ ...state, updating: true, status: 'UPDATING' }),
  ),
  on(
    TimeReportActions.createSuccess,
    (state, { report }) => adapter.addOne(report, { ...state, updating: false, status: 'IDLE' })
  ),
  on(
    TimeReportActions.createFailure,
    (state, { error }) => ({
      ...state,
      updating: false,
      error: error?.message ?? error?.statusText,
      status: 'ERROR'
    })
  ),
  on(
    TimeReportActions.update,
    (state) => ({ ...state, updating: true, status: 'UPDATING' }),
  ),
  on(
    TimeReportActions.updateSuccess,
    (state, { update }) => adapter.updateOne(update, { ...state, updating: false, status: 'IDLE' })
  ),
  on(
    TimeReportActions.updateFailure,
    (state, { error }) => ({
      ...state,
      updating: false,
      error: error?.message ?? error?.statusText,
      status: 'ERROR'
    })
  ),
);
