import { Store } from 'vuex';
import { BaseStorage } from '../base-store/storage';

export interface IFetchingStorage {
  readonly fetching: boolean;
}

export class FetchingStorage<TStore> extends BaseStorage<TStore> implements IFetchingStorage {
  get fetching(): boolean {
    return (this._store.getters as { [key: string]: boolean })[`${this._namespace}/fetching`];
  }

  constructor(store: Store<TStore>, namespace: string) {
    super(store, namespace);
  }
}
