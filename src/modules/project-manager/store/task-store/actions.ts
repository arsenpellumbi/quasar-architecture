import { ActionTree, ActionContext } from 'vuex';
import {
  CreateTaskPayload,
  DeleteTaskPayload,
  GetTaskByIdPayload,
  GetTasksByProjectIdPayload,
  Task,
  TaskInstance,
  SearchTasksInProjectPayload,
  UpdateTaskPayload,
  TaskData
} from '../../entities/task';
import { TaskStoreState } from './state';
import serviceProvider from '../../services';
import { AppStoreState } from 'src/store';

const actions: ActionTree<TaskStoreState, AppStoreState> = {
  async fetchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: GetTasksByProjectIdPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await serviceProvider.taskService.getTasks(payload);
    context.commit('setTasks', result.data);
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages
    });
    context.commit('setFetching', false);
  },

  async searchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: SearchTasksInProjectPayload
  ): Promise<void> {
    context.commit('setFetching', true);
    const result = await serviceProvider.taskService.searchTasks(payload);
    context.commit('setTasks', result.data);
    context.commit('setPagination', {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: result.count,
      totalPages: result.totalPages
    });
    context.commit('setFetching', false);
  },

  async getTaskById(context: ActionContext<TaskStoreState, AppStoreState>, payload: GetTaskByIdPayload): Promise<Task> {
    const task = context.state.tasks.filter((task: TaskData) => task.id == payload.id)[0];
    if (task) {
      return new TaskInstance(task);
    }
    return new TaskInstance(await serviceProvider.taskService.getTask(payload));
  },

  async createTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: CreateTaskPayload): Promise<void> {
    const id = await serviceProvider.taskService.createTask(payload);

    context.commit('addTask', {
      id: id,
      date: new Date(),
      title: payload.title,
      description: payload.description
    });

    context.commit('addPaginationItems', 1);
  },

  async updateTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: UpdateTaskPayload): Promise<void> {
    await serviceProvider.taskService.updateTask(payload);

    const task = context.state.tasks.filter((task: TaskData) => task.id == payload.id)[0];

    if (task)
      context.commit('updateTask', {
        id: task.id,
        date: new Date(),
        title: payload.title,
        description: payload.description
      });
  },

  async deleteTask(context: ActionContext<TaskStoreState, AppStoreState>, payload: DeleteTaskPayload): Promise<void> {
    await serviceProvider.taskService.deleteTask(payload);
    context.commit('deleteTask', payload.id);
    context.commit('removePaginationItems', 1);
  },

  reset(context: ActionContext<TaskStoreState, AppStoreState>): void {
    context.commit('setProjectId', null);
    context.commit('setTasks', []);
  }
};

export default actions;
