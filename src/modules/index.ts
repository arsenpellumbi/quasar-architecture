import { RouteConfig } from 'vue-router/types';
import { ModuleTree } from 'vuex';

interface Module {
  storeModules: ModuleTree<unknown>;
  routeConfig: RouteConfig;
}

class ModuleProvider {
  private _modules = [require('./home'), require('./projectManager')];

  public getStoreModules(): ModuleTree<unknown> {
    let moduleStoreModules: ModuleTree<unknown> = {};

    this._modules.forEach((module: { default: Module }) => {
      if (module.default.storeModules) moduleStoreModules = { ...moduleStoreModules, ...module.default.storeModules };
    });

    return moduleStoreModules;
  }

  public getRoutes(): RouteConfig[] {
    const moduleRoutes: RouteConfig[] = this._modules.map(
      (module: { default: Module }): RouteConfig => {
        return module.default.routeConfig;
      }
    );

    return [
      {
        path: '/',
        redirect: '/projects',
        component: () => import('layouts/MainLayout.vue'),
        children: moduleRoutes,
        meta: {
          requireAuthentication: false,
          title: 'Modules',
          noCache: true
        }
      }
    ];
  }
}

export const moduleProvider = new ModuleProvider();
