import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { ROUTER_FEATURE_KEY, RouterState } from './router.reducer';
import { RouterStateUrl } from './router.serializer';

export const routerStateSelector = createFeatureSelector<RouterState, fromRouter.RouterReducerState<RouterStateUrl>>(ROUTER_FEATURE_KEY);
