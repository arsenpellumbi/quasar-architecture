import { TaskData } from '../../entities/task';
import paginatedStoreState, { PaginatedStoreState } from 'src/store/base/paginated-store/state';

export interface TaskStoreState extends PaginatedStoreState {
  tasks: TaskData[];
}

const state: TaskStoreState = {
  ...paginatedStoreState,
  tasks: []
};

export default state;
