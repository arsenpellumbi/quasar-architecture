import { RouteMeta } from './navigation-guards.types';
import { AppStoreState } from 'src/store';
import { Route, Location } from 'vue-router';
import { Store } from 'vuex';

export default {
  beforeEach: async (
    store: Store<AppStoreState>,
    to: Route,
    from: Route,
    next: (to?: Location) => void
  ): Promise<void> => {
    const routeMeta = to.meta as RouteMeta;
    if (routeMeta.requireAuthentication) {
      await new Promise<void>(resolve => {
        resolve();
      });
      console.log(`Store version: ${store.state.version}. Require authentication!`);
    }

    next();

    // Now you need to add your authentication logic here, like calling an API endpoint
  }
};
