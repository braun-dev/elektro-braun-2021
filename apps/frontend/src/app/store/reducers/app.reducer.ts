import { ActionReducerMap } from '@ngrx/store';
import { appRouterReducer, RouterState } from '@elektro-braun/shared/util-router-state';

export type AppState = RouterState;

export const reducers: ActionReducerMap<AppState> = {
  ...appRouterReducer
}
