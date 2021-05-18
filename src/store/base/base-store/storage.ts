import { Store } from 'vuex';

export class BaseStorage<TStore>{
  protected _store: Store<TStore>;
  protected _namespace: string;

  constructor(store: Store<TStore>, namespace: string) {
    this._store = store;
    this._namespace = namespace;
  }
}