import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { AppStoreState } from 'src/store';
import { Store } from 'vuex';
import { useTaskStorage } from './storage';

export function useTaskStore(store: Store<AppStoreState>) {
  const namespace = 'project-manager/task-store';

  if (!store.hasModule(namespace)) {
    store.registerModule(namespace, {
      namespaced: true,
      actions,
      getters,
      mutations,
      state
    });
  }

  return useTaskStorage(store, namespace);
}
