import { MutationTree } from 'vuex';
import { User } from '../../models/user.model';
import { AuthenticationStoreState } from './state';

export const useMutations = (): MutationTree<AuthenticationStoreState> => ({
  setUser(state: AuthenticationStoreState, user: User | null): void {
    state.user = user;
  },

  setIsAuthenticating(state: AuthenticationStoreState, isAuthenticating: boolean): void {
    state.isAuthenticating = isAuthenticating;
  },
});
