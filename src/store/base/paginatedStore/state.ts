import { Pagination } from 'src/core/types';
import fetchingStoreState, { FetchingStoreState } from '../fetchingStore/state';

export interface PaginatedStoreState extends FetchingStoreState {
  pagination: Pagination;
}

const state: PaginatedStoreState = {
  ...fetchingStoreState,
  pagination: {
    pageIndex: 0,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0
  }
};

export default state;
