import { RouteRecordRaw } from 'vue-router';
import Authentication from './authentication.vue';
import Login from './login/login.vue';
import Register from './register/register.vue';
import OidcLogin from './oidc-login/oidc-login.vue';
import OidcLoginRedirect from './oidc-login-redirect/oidc-login-redirect.vue';
import OidcLoginSilentRenew from './oidc-login-silent-renew/oidc-login-silent-renew.vue';
import OidcLogoutRedirect from './oidc-logout-redirect/oidc-logout-redirect.vue';

const route: RouteRecordRaw = {
  path: '/authentication',
  redirect: { name: 'Login' },
  component: Authentication,
  meta: {
    requireAuthentication: false,
    noCache: true,
    layout: 'empty-layout',
  },
  children: [
    {
      path: 'login',
      name: 'Login',
      component: Login,
    },
    {
      path: 'register',
      name: 'Register',
      component: Register,
    },
    {
      path: 'oidc-login',
      name: 'OidcLogin',
      component: OidcLogin,
    },
    {
      path: 'oidc-login-redirect',
      name: 'OidcLoginRedirect',
      component: OidcLoginRedirect,
    },
    {
      path: 'oidc-login-silent-renew',
      name: 'OidcLoginSilentRenew',
      component: OidcLoginSilentRenew,
    },
    {
      path: 'oidc-logout-redirect',
      name: 'OidcLogoutRedirect',
      component: OidcLogoutRedirect,
    },
  ],
};

export default route;
