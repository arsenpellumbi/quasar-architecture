import { computed, ComputedRef } from '@vue/composition-api';
import { AppStoreState } from 'src/store';
import { Store } from 'vuex';

export interface FetchingStorage {
  readonly fetching: ComputedRef<boolean>;
}

export default function useFetchingStore(store: Store<AppStoreState>, namespace: string): FetchingStorage {
  return {
    fetching: computed(() => (store.getters as { [key: string]: boolean })[`${namespace}/fetching`])
  };
}
