import { GetterTree } from 'vuex';
import { Task, TaskData, TaskInstance } from '../../entities/task';
import { TaskStoreState } from './state';
import paginatedGetters from 'src/store/base/paginatedStore/getters';

const getters: GetterTree<TaskStoreState, unknown> = {
  ...paginatedGetters,
  currentTasks(state: TaskStoreState): Task[] {
    return state.tasks.map((task: TaskData) => new TaskInstance(task));
  }
};

export default getters;
