import { computed, ComputedRef } from '@vue/composition-api';
import { Pagination } from 'src/core/types';
import { Store } from 'vuex';
import { useFetchingStorage, FetchingStorage } from '../fetching-store/storage';

export interface PaginatedStorage extends FetchingStorage {
  readonly currentPagination: ComputedRef<Pagination>;
}

export function usePaginatedStorage<TStore>(store: Store<TStore>, namespace: string): PaginatedStorage {
  return {
    ...useFetchingStorage(store, namespace),
    currentPagination: computed(
      () => (store.getters as { [key: string]: Pagination })[`${namespace}/currentPagination`]
    )
  };
}
