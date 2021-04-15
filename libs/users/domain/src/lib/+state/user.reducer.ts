import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { actions as UserActions } from './user.actions';
import { createReducer, on } from '@ngrx/store';
import { User } from '../entities/user';

export const FEATURE_NAME = 'users';

export interface UserState extends EntityState<User> {
  loaded: boolean;
  loading: boolean;
  updating: boolean;
  status: 'IDLE' | 'LOADING' | 'LOADED' | 'UPDATING' | 'ERROR',
  error: string | null;
}

export const adapter = createEntityAdapter<User>()

export const initialState = adapter.getInitialState({
  loaded: false,
  loading: false,
  updating: false,
  status: 'IDLE',
  error: null
})

export const reducer = createReducer(
  initialState,
  on(
    UserActions.load,
    (state) => ({ ...state, loading: true, status: 'LOADING', error: null })
  ),
  on(
    UserActions.loadSuccess,
    (state, { users }) => adapter.upsertMany(users, ({ ...state, loaded: true, loading: false, status: 'LOADED', error: null }))
  ),
  on(
    UserActions.loadFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message ?? error.statusText,
      status: 'ERROR'
    })
  ),
  on(
    UserActions.create,
    (state) => ({ ...state, loading: true, status: 'UPDATING', error: null })
  ),
  on(
    UserActions.createSuccess,
    (state, { user }) => adapter.addOne(user, {...state, loading: false, updating: false, status: 'IDLE', error: null })
  ),
  on(
    UserActions.createFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message ?? error.statusText,
      status: 'ERROR'
    })
  )
);
