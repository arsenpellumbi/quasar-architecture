import { MutationTree } from 'vuex';
import { TaskList, Task } from '../../models/task.model';
import { TaskStoreState } from './state';

export const useMutations = (): MutationTree<TaskStoreState> => ({
  setTasks(state: TaskStoreState, taskList: TaskList): void {
    state.taskList.updateList(taskList);
  },

  addTask(state: TaskStoreState, task: Task): void {
    state.taskList.addItem(task);
  },

  updateTask(state: TaskStoreState, task: Task): void {
    const oldTask = state.taskList.rows.find((_task: Task) => _task.id == task.id);
    if (oldTask) state.taskList.updateItem(oldTask, task);
    else state.taskList.addItem(task);
  },

  deleteTask(state: TaskStoreState, id: Guid): void {
    const task = state.taskList.rows.find((_task: Task) => _task.id == id);
    if (task) state.taskList.removeItem(task);
  },
});
