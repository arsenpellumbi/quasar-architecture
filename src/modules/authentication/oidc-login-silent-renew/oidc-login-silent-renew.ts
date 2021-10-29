import { Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { AuthenticationStore, AUTHENTICATION_STORE } from '../core/store/authentication-store';

export default class OidcLoginSilentRenew extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  async mounted() {
    await this._authenticationStore.signinSilentCallback();
  }
}
