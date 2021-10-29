import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import { createStore, Store } from 'vuex';

export const APP_STORE: interfaces.ServiceIdentifier<AppStore> = 'APP_STORE';

export interface AppStoreState {
  version: number;
}

@provide<AppStore>(APP_STORE, true)
export class AppStore {
  private _store: Store<AppStoreState>;

  public get store() {
    return this._store;
  }

  constructor(@inject(CONFIGURATIONS) configurations: Configurations) {
    this._store = createStore<AppStoreState>({
      state: {
        version: 1,
      },

      strict: !!configurations.debug,
    });
  }
}
