/* eslint-disable */

import { App } from 'vue';
import { Router } from 'vue-router';

export interface PluginParams<TStore> {
  app: App<any>;
  router: Router;
  store: TStore;
  urlPath: string;
  publicPath: string;
}
