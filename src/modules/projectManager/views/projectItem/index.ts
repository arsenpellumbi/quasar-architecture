import { RouteConfig } from 'vue-router/types';
import { RouteMeta } from 'src/router/navigation-guards.types';

const meta: RouteMeta = {
  requireAuthentication: true,
  title: 'Project item',
  noCache: true
};

const projectItemRoute: RouteConfig = {
  path: ':projectId',
  name: 'ProjectItem',
  component: () => import('./ProjectItem.vue'),
  meta: meta
};

export default projectItemRoute;
