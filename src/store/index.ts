import { store } from 'quasar/wrappers';
import { moduleProvider } from 'src/modules';
import Vuex, { ModuleTree } from 'vuex';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface AppStoreState {
  version: number;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const storeModules: ModuleTree<AppStoreState> = moduleProvider.getStoreModules();
  const definedModules = { ...storeModules };

  const store = new Vuex.Store({
    state: {
      version: 1
    },
    modules: definedModules,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return store;
});
