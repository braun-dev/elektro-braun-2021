import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  params: Params,
  queryParams: Params
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;
    const { url } = routerState;
    const { queryParams } = routerState.root;

    return { params, queryParams, url };
  }
}
