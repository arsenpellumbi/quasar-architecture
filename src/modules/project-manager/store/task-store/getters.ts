import { GetterTree } from 'vuex';
import { Task, TaskData } from '../../entities/task';
import { TaskStoreState } from './state';
import paginatedGetters from 'src/store/base/paginated-store/getters';

const getters: GetterTree<TaskStoreState, unknown> = {
  ...paginatedGetters,
  currentTasks(state: TaskStoreState): Task[] {
    return state.tasks.map((task: TaskData) => new Task(task));
  }
};

export default getters;
