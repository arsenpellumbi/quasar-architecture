import { GetterTree } from 'vuex';
import { AppStoreState } from '../../../../../store/app.store';
import { AuthenticationStoreState } from './state';
import { User } from '../../models/user.model';

export const useGetters = (): GetterTree<AuthenticationStoreState, AppStoreState> => ({
  user(state: AuthenticationStoreState): User | null {
    return state.user;
  },

  isAuthenticating(state: AuthenticationStoreState): boolean {
    return state.isAuthenticating;
  },
});
