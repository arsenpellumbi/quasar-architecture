import { RouteConfig } from 'vue-router';
import Layout from './index.vue';

const homeRoute: RouteConfig = {
  path: '/home',
  name: 'Home',
  component: Layout,
  meta: {
    requireAuthentication: true,
    title: 'Home',
    noCache: true
  }
};

export default {
  storeModules: undefined,
  routeConfig: homeRoute
};
