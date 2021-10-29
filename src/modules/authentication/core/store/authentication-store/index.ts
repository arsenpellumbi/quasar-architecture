import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useMutations } from './mutations';
import { useState } from './state';
import { AuthenticationService, AUTHENTICATION_SERVICE } from '../../services/authentication-service';
import { AppStore, APP_STORE } from '../../../../../store/app.store';
import { User } from '../../models/user.model';

export const AUTHENTICATION_STORE: interfaces.ServiceIdentifier<AuthenticationStore> = 'AUTHENTICATION_STORE';

@provide<AuthenticationStore>(AUTHENTICATION_STORE)
export class AuthenticationStore {
  private readonly _namespace: string;
  private readonly _appStore: AppStore;

  constructor(
    @inject(APP_STORE) appStore: AppStore,
    @inject(AUTHENTICATION_SERVICE) authenticationService: AuthenticationService
  ) {
    this._namespace = 'authentication-store';
    this._appStore = appStore;

    if (!this._appStore.store.hasModule(this._namespace)) {
      this._appStore.store.registerModule(this._namespace, {
        namespaced: true,
        actions: useActions(authenticationService),
        getters: useGetters(),
        mutations: useMutations(),
        state: useState(),
      });
    }
  }

  get user(): User {
    return (this._appStore.store.getters as { [key: string]: User })[`${this._namespace}/user`];
  }

  get isAuthenticating(): boolean {
    return (this._appStore.store.getters as { [key: string]: boolean })[`${this._namespace}/isAuthenticating`];
  }

  async login(returnPath: string): Promise<void> {
    return (await this._appStore.store.dispatch(`${this._namespace}/login`, returnPath)) as Promise<void>;
  }

  async logout(): Promise<void> {
    return (await this._appStore.store.dispatch(`${this._namespace}/logout`)) as Promise<void>;
  }

  async authenticate(returnPath: string): Promise<void> {
    return (await this._appStore.store.dispatch(`${this._namespace}/authenticate`, returnPath)) as Promise<void>;
  }

  async isUserLoggedIn(): Promise<boolean> {
    return (await this._appStore.store.dispatch(`${this._namespace}/isUserLoggedIn`)) as Promise<boolean>;
  }

  async signinRedirectCallback(returnPath: string): Promise<void> {
    return (await this._appStore.store.dispatch(
      `${this._namespace}/signinRedirectCallback`,
      returnPath
    )) as Promise<void>;
  }

  async signoutRedirectCallback(returnPath: string): Promise<void> {
    return (await this._appStore.store.dispatch(
      `${this._namespace}/signoutRedirectCallback`,
      returnPath
    )) as Promise<void>;
  }

  async signinSilentCallback(): Promise<void> {
    return (await this._appStore.store.dispatch(`${this._namespace}/signinSilentCallback`)) as Promise<void>;
  }

  async reset(): Promise<void> {
    return (await this._appStore.store.dispatch(`${this._namespace}/reset`)) as Promise<void>;
  }
}
