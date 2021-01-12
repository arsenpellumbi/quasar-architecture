import { computed, ComputedRef } from '@vue/composition-api';
import { Store } from 'vuex';

export interface FetchingStorage {
  readonly fetching: ComputedRef<boolean>;
}

export function useFetchingStorage<TStore>(store: Store<TStore>, namespace: string): FetchingStorage {
  return {
    fetching: computed(() => (store.getters as { [key: string]: boolean })[`${namespace}/fetching`])
  };
}
