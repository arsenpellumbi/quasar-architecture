import { RouteConfig } from 'vue-router/types';
import { RouteMeta } from 'src/router/navigation-guards.types';

const meta: RouteMeta = {
  requireAuthentication: true,
  title: 'Project item',
  noCache: true
};

const projectItemRoute: RouteConfig = {
  path: 'projects/:projectId',
  name: 'ProjectItem',
  component: () => import('./project-item.vue'),
  meta: meta
};

export default projectItemRoute;
