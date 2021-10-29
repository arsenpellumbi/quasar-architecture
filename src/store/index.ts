import { store } from 'quasar/wrappers';
import { container } from '~/inversify.config';
import { AppStore, APP_STORE } from './app.store';

export default store(function () {
  const appStore = container.get<AppStore>(APP_STORE);

  return appStore.store;
});
