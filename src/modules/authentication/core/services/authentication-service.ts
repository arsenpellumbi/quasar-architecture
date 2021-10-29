import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import { User } from '~/modules/authentication/core/models/user.model';
import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';

export const AUTHENTICATION_SERVICE: interfaces.ServiceIdentifier<AuthenticationService> = 'AUTHENTICATION_SERVICE';

@provide<AuthenticationService>(AUTHENTICATION_SERVICE)
export class AuthenticationService {
  private userManager: UserManager;
  private _config: Configurations;

  constructor(@inject(CONFIGURATIONS) config: Configurations) {
    this._config = config;
    const settings: UserManagerSettings = {
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: config.identity.authority,
      client_id: config.identity.clientId,
      client_secret: config.identity.clientSecret,
      automaticSilentRenew: config.identity.automaticSilentRenew,
      response_type: config.identity.responseType,
      scope: config.identity.scope,
      filterProtocolClaims: config.identity.filterProtocolClaims,
      redirect_uri: config.identity.redirectUri,
      silent_redirect_uri: config.identity.silentRedirectUri,
      post_logout_redirect_uri: config.identity.postLogoutRedirectUri,
    };
    this.userManager = new UserManager(settings);
    this.userManager.events.addUserSignedOut(this.onUserSignedOut);
  }

  private onUserSignedOut = (): void => {
    this.userManager.getUser().then((user) => {
      if (user) this.userManager.removeUser();
      window.location.replace(this._config.identity.postLogoutRedirectUri);
    });
  };

  public async getUser(): Promise<User> {
    const user = await this.userManager.getUser();
    return new User(
      user?.profile.nickname,
      user?.profile.email,
      user?.profile.name,
      user?.profile.family_name,
      user?.access_token,
      !!user?.access_token
    );
  }

  public async login(returnPath: string): Promise<User> {
    try {
      await this.userManager.signinRedirect(returnPath);
      return await this.getUser();
    } catch {
      return new User();
    }
  }

  public async logout(): Promise<void> {
    await this.userManager.signoutRedirect();
  }

  public async getAccessToken(): Promise<string | null> {
    const user = await this.getUser();
    return user.authToken;
  }

  public async isUserLoggedIn(): Promise<boolean> {
    const user = await this.getUser();
    return user.authenticated;
  }

  public async signinRedirectCallback(returnPath: string): Promise<User> {
    const user = await this.userManager.signinRedirectCallback(returnPath);
    return new User(
      user?.profile.nickname,
      user?.profile.email,
      user?.profile.name,
      user?.profile.family_name,
      user?.access_token,
      !!user?.access_token
    );
  }

  public async signoutRedirectCallback(returnPath: string): Promise<void> {
    await this.userManager.signoutPopupCallback(returnPath, false);
  }

  public async signinSilentCallback(): Promise<User> {
    const user = await this.userManager.signinSilentCallback();
    return new User(
      user?.profile.nickname,
      user?.profile.email,
      user?.profile.name,
      user?.profile.family_name,
      user?.access_token,
      !!user?.access_token
    );
  }
}
