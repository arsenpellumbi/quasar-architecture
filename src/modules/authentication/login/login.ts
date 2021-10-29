import { Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { Configurations, CONFIGURATIONS } from '~/core/configurations/configurations';
import { AuthenticationStore, AUTHENTICATION_STORE } from '../core/store/authentication-store';

export default class Login extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  @lazyInject(CONFIGURATIONS)
  private readonly _configurations!: Configurations;

  loading = false;
  username = '';
  password = '';
  rememberMe = false;

  async login(): Promise<void> {
    this.loading = true;
    await this._authenticationStore.login(this._configurations.identity.redirectUri);
    const isUserLoggedIn = await this._authenticationStore.isUserLoggedIn();
    if (isUserLoggedIn) await this.$router.push({ path: this._configurations.initialRoutePath });
    this.loading = false;
  }

  onSubmit(): void {
    console.log('Login');
  }

  mounted() {
    console.log(this._configurations);
    // const isAuthenticated = await this._authenticationStore.isUserLoggedIn();

    // if (isAuthenticated) {
    //   await this.$router.push({ path: this._configurations.initialRoutePath });
    // }
  }
}
