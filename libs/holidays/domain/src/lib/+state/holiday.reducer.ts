import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const FEATURE_NAME = 'holidays';

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
