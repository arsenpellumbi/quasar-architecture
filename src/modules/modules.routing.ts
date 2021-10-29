import { RouteRecordRaw } from 'vue-router';
import authenticationRoute from './authentication/authentication.routing';
import homeRoute from './home/home.routing';
import projectsRoute from './projects/projects.routing';
import errorRoute from './error/error.routing';

const routes: RouteRecordRaw[] = [authenticationRoute, projectsRoute, homeRoute, errorRoute];
export default routes;
