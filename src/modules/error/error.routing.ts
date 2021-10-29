import { RouteRecordRaw } from 'vue-router';
import Error from './error.vue';
import Error404 from './404/404.vue';
import Error500 from './500/500.vue';

const route: RouteRecordRaw = {
  path: '/error',
  redirect: { name: '404' },
  component: Error,
  meta: {
    requireAuthentication: false,
    noCache: true,
    layout: 'empty-layout',
  },
  children: [
    {
      path: '404',
      name: '404',
      component: Error404,
    },
    {
      path: '500',
      name: '500',
      component: Error500,
    },
  ],
};

export default route;
