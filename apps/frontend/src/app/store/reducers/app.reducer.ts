import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.RouterReducerState
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}
