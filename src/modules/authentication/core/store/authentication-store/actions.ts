import { ActionTree, ActionContext } from 'vuex';
import { AuthenticationService } from '../../services/authentication-service';
import { AppStoreState } from '../../../../../store/app.store';
import { AuthenticationStoreState } from './state';

export const useActions = (
  authenticationService: AuthenticationService
): ActionTree<AuthenticationStoreState, AppStoreState> => ({
  async login(context: ActionContext<AuthenticationStoreState, AppStoreState>, returnPath: string): Promise<void> {
    context.commit('setIsAuthenticating', true);
    const user = await authenticationService.login(returnPath);
    context.commit('setUser', user);
    context.commit('setIsAuthenticating', false);
  },

  async logout(context: ActionContext<AuthenticationStoreState, AppStoreState>): Promise<void> {
    await authenticationService.logout();
    context.commit('setUser', null);
  },

  async authenticate(
    context: ActionContext<AuthenticationStoreState, AppStoreState>,
    returnPath: string
  ): Promise<void> {
    const isUserLoggedIn = await authenticationService.isUserLoggedIn();
    if (!isUserLoggedIn) {
      context.commit('setIsAuthenticating', true);
      await authenticationService.login(returnPath);
      const user = await authenticationService.getUser();
      context.commit('setUser', user);
      context.commit('setIsAuthenticating', false);
    }
  },

  async isUserLoggedIn(context: ActionContext<AuthenticationStoreState, AppStoreState>): Promise<boolean> {
    const isUserLoggedIn = await authenticationService.isUserLoggedIn();
    const user = await authenticationService.getUser();
    context.commit('setUser', user);
    return isUserLoggedIn;
  },

  async signinRedirectCallback(
    context: ActionContext<AuthenticationStoreState, AppStoreState>,
    returnPath: string
  ): Promise<void> {
    const user = await authenticationService.signinRedirectCallback(returnPath);
    context.commit('setUser', user);
  },

  async signoutRedirectCallback(
    context: ActionContext<AuthenticationStoreState, AppStoreState>,
    returnPath: string
  ): Promise<void> {
    await authenticationService.signoutRedirectCallback(returnPath);
  },

  async signinSilentCallback(context: ActionContext<AuthenticationStoreState, AppStoreState>): Promise<void> {
    const user = await authenticationService.signinSilentCallback();
    context.commit('setUser', user);
  },

  reset(context: ActionContext<AuthenticationStoreState, AppStoreState>): void {
    context.commit('setUser', null);
  },
});
