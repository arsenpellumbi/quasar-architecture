import { Pagination } from 'src/core/types';
import { MutationTree } from 'vuex';
import { PaginatedStoreState } from './state';
import fetchingMutations from '../fetchingStore/mutations';

const mutation: MutationTree<PaginatedStoreState> = {
  ...fetchingMutations,
  setPagination(state: PaginatedStoreState, pagination: Pagination): void {
    state.pagination = pagination;
  },

  addPaginationItems(state: PaginatedStoreState, count: number): void {
    state.pagination.totalCount += count;
    state.pagination.totalPages = Math.ceil(state.pagination.totalCount / state.pagination.pageSize);
  },

  removePaginationItems(state: PaginatedStoreState, count: number): void {
    state.pagination.totalCount -= count;
    state.pagination.totalPages = Math.ceil(state.pagination.totalCount / state.pagination.pageSize);
    if (state.pagination.pageIndex >= state.pagination.totalPages)
      state.pagination.pageIndex = state.pagination.totalPages - 1;
  }
};

export default mutation;
