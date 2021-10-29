import { route } from 'quasar/wrappers';
import { Store } from 'vuex/types/index.js';
import { AppStoreState } from '~/store/app.store';
import { container } from '~/inversify.config';
import { AppRouter, APP_ROUTER } from './app.routing';

export default route<Store<AppStoreState>>(function () {
  const appRouter = container.get<AppRouter>(APP_ROUTER);
  return appRouter.router;
});
