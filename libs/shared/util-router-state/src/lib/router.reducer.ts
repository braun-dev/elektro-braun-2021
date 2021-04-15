import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router.serializer';

export const ROUTER_FEATURE_KEY = 'router';

export interface RouterState {
  router: fromRouter.RouterReducerState<RouterStateUrl>
}

export const appRouterReducer: ActionReducerMap<RouterState> = {
  [ROUTER_FEATURE_KEY]: routerReducer
}
