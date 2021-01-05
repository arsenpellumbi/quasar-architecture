import { MutationTree } from 'vuex';
import { FetchingStoreState } from './state';

const mutation: MutationTree<FetchingStoreState> = {
  setFetching(state: FetchingStoreState, fetching: boolean): void {
    state.fetching = fetching;
  }
};

export default mutation;
