import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../entities/employee';
import { actions as EmployeeActions } from './employee.actions';

export const FEATURE_NAME = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loaded: boolean;
  loading: boolean;
  updating: boolean;
  status: 'IDLE' | 'LOADING' | 'LOADED' | 'UPDATING' | 'ERROR',
  error: string | null;
}

export const adapter = createEntityAdapter<Employee>()

export const initialState = adapter.getInitialState({
  loaded: false,
  loading: false,
  updating: false,
  status: 'IDLE',
  error: null,
})

export const reducer = createReducer(
  initialState,
  on(
    EmployeeActions.load,
    (state) => ({ ...state, loading: true, loaded: false, status: 'LOADING', error: null })
  ),
  on(
    EmployeeActions.loadSuccess,
    (state, { employees }) => adapter.upsertMany(employees, ({ ...state, loaded: true, loading: false, status: 'LOADED', error: null }))
  ),
  on(
    EmployeeActions.loadFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error.message ?? error.statusText,
      status: 'ERROR'
    })
  ),
  on(
    EmployeeActions.create,
    (state) => ({ ...state, status: 'UPDATING', updating: true, error: null })
  ),
  on(
    EmployeeActions.createSuccess,
    (state, { employee }) => adapter.addOne(employee, { ...state, updating: false, status: 'IDLE' })
  ),
  on(
    EmployeeActions.createFailure,
    (state, { error }) => ({
      ...state,
      updating: false,
      error: error.message ?? error.statusText,
      status: 'ERROR'
    })
  ),
);
