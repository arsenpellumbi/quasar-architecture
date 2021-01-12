import { RouteConfig } from 'vue-router/types';

interface Module {
  routeConfig: RouteConfig;
}

export function useModuleProvider() {
  const modules = [require('./home'), require('./project-manager')];

  function getRoutes(): RouteConfig[] {
    const moduleRoutes: RouteConfig[] = modules.map(
      (module: { default: Module }): RouteConfig => {
        return module.default.routeConfig;
      }
    );

    return moduleRoutes;
  }

  return {
    getRoutes
  };
}
