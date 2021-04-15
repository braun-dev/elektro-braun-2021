import { createAction, props, Selector } from '@ngrx/store';
import { NavigationExtras, Params } from '@angular/router';

const ROUTER_ACTION_KEY = 'Router';

const go = createAction(
  `[${ROUTER_ACTION_KEY}] Go`,
  props<{ path: any[]; query?: Params, extras?: NavigationExtras }>()
)

const goWithStoreParam = createAction(
  `[${ROUTER_ACTION_KEY}] Go With Store Data`,
  props<{ path: any[]; selector: Selector<any, string>, query?: Params, extras?: NavigationExtras }>()
)

const back = createAction(
  `[${ROUTER_ACTION_KEY}] Back`
)

const forward = createAction(
  `[${ROUTER_ACTION_KEY}] Forward`
)

export const actions = {
  go,
  forward,
  back,
  goWithStoreParam
}
