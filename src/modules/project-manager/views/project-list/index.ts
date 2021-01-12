import { RouteConfig } from 'vue-router';

const projectListRoute: RouteConfig = {
  path: 'projects',
  name: 'ProjectList',
  component: () => import('./project-list.vue'),
  meta: {
    requireAuthentication: true,
    title: 'Project list',
    noCache: true
  }
};

export default projectListRoute;
