import Layout from './index.vue';
import storeModules from './store';
import projectListRoute from './views/projectList';
import projectItemRoute from './views/projectItem';
import { RouteConfig } from 'vue-router/types';
import { RouteMeta } from 'src/router/navigation-guards.types';

const meta: RouteMeta = {
  requireAuthentication: true,
  title: 'Project manager',
  noCache: true
};

const projectManagerRoute: RouteConfig = {
  path: '/projects',
  component: Layout,
  children: [projectListRoute, projectItemRoute],
  meta: meta
};

export default {
  storeModules: storeModules,
  routeConfig: projectManagerRoute
};
