import { User } from '../../models/user.model';

export interface AuthenticationStoreState {
  user: User | null;
  isAuthenticating: boolean;
}

export const useState = (): AuthenticationStoreState => ({
  user: null,
  isAuthenticating: false,
});
