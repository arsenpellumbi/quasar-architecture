import { Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import { AuthenticationStore, AUTHENTICATION_STORE } from '../core/store/authentication-store';

export default class Login extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  @lazyInject(CONFIGURATIONS)
  private readonly _configurations!: Configurations;

  loading = false;
  username = '';
  password = '';
  rePassword = '';
  acceptAgreements = false;

  onSubmit(): void {
    console.log('Register');
  }
}
