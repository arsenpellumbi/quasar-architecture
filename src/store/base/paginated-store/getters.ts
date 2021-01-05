import { Pagination } from 'src/core/types';
import { GetterTree } from 'vuex';
import { PaginatedStoreState } from './state';
import fetchingGetters from '../fetching-store/getters';
import { AppStoreState } from 'src/store';

const getters: GetterTree<PaginatedStoreState, AppStoreState> = {
  ...fetchingGetters,
  currentPagination(state: PaginatedStoreState): Pagination {
    return state.pagination;
  }
};

export default getters;
