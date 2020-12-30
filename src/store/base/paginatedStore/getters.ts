import { Pagination } from 'src/core/types';
import { GetterTree } from 'vuex';
import { PaginatedStoreState } from './state';
import fetchingGetters from '../fetchingStore/getters';
import { AppStoreState } from 'src/store';

const getters: GetterTree<PaginatedStoreState, AppStoreState> = {
  ...fetchingGetters,
  currentPagination(state: PaginatedStoreState): Pagination {
    return state.pagination;
  }
};

export default getters;
