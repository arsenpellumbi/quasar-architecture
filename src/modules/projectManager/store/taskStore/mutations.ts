import { MutationTree } from 'vuex';
import { TaskData } from '../../entities/task';
import { TaskStoreState } from './state';
import paginatedMutations from 'src/store/base/paginatedStore/mutations';

const mutation: MutationTree<TaskStoreState> = {
  ...paginatedMutations,

  setTasks(state: TaskStoreState, tasks: TaskData[]): void {
    state.tasks = tasks;
  },

  addTask(state: TaskStoreState, task: TaskData): void {
    state.tasks.unshift(task);
  },

  updateTask(state: TaskStoreState, task: TaskData): void {
    const index = state.tasks.indexOf(state.tasks.filter((_task: TaskData) => _task.id === task.id)[0]);
    state.tasks = Object.assign([], state.tasks, { [index]: task });
  },

  deleteTask(state: TaskStoreState, id: Guid): void {
    state.tasks = state.tasks.filter((_task: TaskData) => _task.id !== id);
  }
};

export default mutation;
