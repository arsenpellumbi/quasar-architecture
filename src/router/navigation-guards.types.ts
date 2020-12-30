import { AppStoreState } from 'src/store';
import { Route, Location } from 'vue-router';
import { Store } from 'vuex';

export type RouterBeforeResolveFunction = (
  store: Store<AppStoreState>,
  routeTo: Route,
  routeFrom: Route,
  next: (to?: Location) => void
) => void;

export interface RouteMeta {
  readonly requireAuthentication: boolean;
  readonly title: string;
  readonly props?: unknown;
  readonly noCache?: boolean;
  readonly beforeResolve?: RouterBeforeResolveFunction;
}
