import { RouteRecordRaw } from 'vue-router';
import Home from './home.vue';

const route: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    requireAuthentication: true,
    title: 'Home',
    noCache: true,
    layout: 'main-layout',
  },
};

export default route;
