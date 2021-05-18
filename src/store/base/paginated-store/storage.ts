import { Pagination } from 'src/core/types';
import { Store } from 'vuex';
import { FetchingStorage, IFetchingStorage } from '../fetching-store/storage';

export interface IPaginatedStorage extends IFetchingStorage {
  readonly currentPagination: Pagination;
}

export class PaginatedStorage<TStore> extends FetchingStorage<TStore> implements IPaginatedStorage {
  get currentPagination(): Pagination {
    return (this._store.getters as { [key: string]: Pagination })[`${this._namespace}/currentPagination`];
  }

  constructor(store: Store<TStore>, namespace: string) {
    super(store, namespace);
  }
}
