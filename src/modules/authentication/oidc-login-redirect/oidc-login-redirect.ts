import { Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import { AuthenticationStore, AUTHENTICATION_STORE } from '../core/store/authentication-store';

export default class OidcLoginRedirect extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  @lazyInject(CONFIGURATIONS)
  private readonly _configurations!: Configurations;

  async mounted() {
    await this._authenticationStore.signinRedirectCallback(this.$route.fullPath);
    await this.$router.push({ path: this._configurations.initialRoutePath });
  }
}
