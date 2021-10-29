import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import { Router, createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/modules/authentication/core/store/authentication-store';
import routes from '~/modules/modules.routing';

export const APP_ROUTER: interfaces.ServiceIdentifier<AppRouter> = 'APP_ROUTER';

@provide<AppRouter>(APP_ROUTER, true)
export class AppRouter {
  private _router: Router;

  public get router() {
    return this._router;
  }

  constructor(
    @inject(CONFIGURATIONS) configurations: Configurations,
    @inject(AUTHENTICATION_STORE) private authenticationStore: AuthenticationStore
  ) {
    this._router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes: routes,
      history: createWebHistory(process.env.VUE_ROUTER_BASE),
    });

    this._router.addRoute({ path: '/', redirect: configurations.initialRoutePath });
    this._router.addRoute({ path: '/:pathMatch(.*)*', redirect: 'error/404' });

    this._router.beforeEach(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) =>
        await this.beforeEach(to, from, next)
    );
  }

  async beforeEach(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    // if (!to.meta.requireAuthentication) {
    return next();
    //}

    const isAuthenticated = await this.authenticationStore.isUserLoggedIn();
    if (isAuthenticated) return next();

    return next({ path: '/authentication' });
  }
}
