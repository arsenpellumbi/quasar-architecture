import Layout from './index.vue';
import projectListRoute from './views/project-list';
import projectItemRoute from './views/project-item';
import { RouteConfig } from 'vue-router/types';
import { RouteMeta } from 'src/router/navigation-guards.types';

const meta: RouteMeta = {
  requireAuthentication: true,
  title: 'Project manager',
  noCache: true
};

const projectManagerRoute: RouteConfig = {
  path: '/project-manager',
  redirect: '/project-manager/projects',
  component: Layout,
  children: [projectListRoute, projectItemRoute],
  meta: meta
};

export default {
  routeConfig: projectManagerRoute
};
