import { Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import { AuthenticationStore, AUTHENTICATION_STORE } from '../core/store/authentication-store';

export default class OidcLogin extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  @lazyInject(CONFIGURATIONS)
  private readonly _configurations!: Configurations;

  loading = false;

  async login(): Promise<void> {
    this.loading = true;
    await this._authenticationStore.login(this._configurations.identity.redirectUri);
    this.loading = false;
  }

  async mounted() {
    this.loading = true;
    const isAuthenticated = await this._authenticationStore.isUserLoggedIn();

    if (isAuthenticated) await this.$router.push({ path: this._configurations.initialRoutePath });
    else this.loading = false;
  }
}
