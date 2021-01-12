import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { AppStoreState } from 'src/store';
import { Store } from 'vuex';
import { useProjectStorage } from './storage';

export function useProjectStore(store: Store<AppStoreState>) {
  const namespace = 'project-manager/project-store';

  if (!store.hasModule(namespace)) {
    store.registerModule(namespace, {
      namespaced: true,
      actions,
      getters,
      mutations,
      state
    });
  }

  return useProjectStorage(store, namespace);
}
