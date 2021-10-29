<template>
  <div id="q-app">
    <app-splash-screen v-if="loading" label="Login"> </app-splash-screen>
    <component :is="layout" v-else>
      <router-view></router-view>
    </component>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/modules/authentication/core/store/authentication-store';

export default class App extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  public name = 'App';

  get loading() {
    return this._authenticationStore.isAuthenticating && this.$route.name != 'Login';
  }

  get layout() {
    return this.$route.meta.layout || 'empty-layout';
  }
}
</script>
