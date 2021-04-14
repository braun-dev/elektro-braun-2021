import { ActionReducerMap, createReducer } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../entities/employee';

export const FEATURE_NAME = 'employee';

export interface State extends EntityState<Employee> {
  loaded: boolean;
  loading: boolean;
  updating: boolean;
  status: 'IDLE' | 'LOADING' | 'UPDATING'
}

export const adapter = createEntityAdapter<Employee>()

export const initialState = adapter.getInitialState({
  loaded: false,
  loading: false,
  updating: false,
  status: 'IDLE'
})

export const reducer = createReducer(
  initialState
);
