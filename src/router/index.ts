import { route } from 'quasar/wrappers';
import VueRouter, { Route, RouteConfig, Location, RawLocation } from 'vue-router';
import { Store } from 'vuex';
import routes from './routes';
import { moduleProvider } from '../modules';
import navigationGuard from './navigation-guards';
import { AppStoreState } from 'src/store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<AppStoreState>>(function({ store, Vue }) {
  Vue.use(VueRouter);

  const moduleRoutes: RouteConfig[] = moduleProvider.getRoutes();
  const definedRoutes = [...moduleRoutes, ...routes];
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: definedRoutes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  router.beforeEach(
    async (to: Route, from: Route, next: (to?: Location | RawLocation | false | void) => void) =>
      await navigationGuard.beforeEach(store, to, from, next)
  );

  return router;
});
