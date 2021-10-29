import { ActionTree, ActionContext } from 'vuex';
import { TaskStoreState } from './state';
import { AppStoreState } from '~/store/app.store';
import { Task, TaskList } from '../../models/task.model';
import { TaskPayloads } from '../../payloads';
import { TaskService } from '../../services/task-service';

export const useActions = (taskService: TaskService): ActionTree<TaskStoreState, AppStoreState> => ({
  async fetchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: TaskPayloads.GetTasksByProjectIdPayload
  ): Promise<void> {
    const result = await taskService.getTasks(payload);
    context.commit('setTasks', result);
  },

  async searchTasks(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: TaskPayloads.SearchTasksInProjectPayload
  ): Promise<void> {
    const result = await taskService.searchTasks(payload);
    context.commit('setTasks', result);
  },

  async getTaskById(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: TaskPayloads.GetTaskByIdPayload
  ): Promise<Task> {
    const task = context.state.taskList.rows.filter((task: Task) => task.id == payload.id)[0];
    if (task) {
      return task;
    }

    return await taskService.getTask(payload);
  },

  async createTask(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: TaskPayloads.CreateTaskPayload
  ): Promise<void> {
    const id = await taskService.createTask(payload);

    context.commit(
      'addTask',
      new Task(id, new Date(), payload.title, payload.description, payload.projectId, payload.type)
    );
  },

  async updateTask(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: TaskPayloads.UpdateTaskPayload
  ): Promise<void> {
    await taskService.updateTask(payload);

    const task = context.state.taskList.rows.find((task: Task) => task.id == payload.id);

    if (task)
      context.commit(
        'updateTask',
        new Task(task.id, new Date(), payload.title, payload.description, task.projectId, payload.type)
      );
  },

  async deleteTask(
    context: ActionContext<TaskStoreState, AppStoreState>,
    payload: TaskPayloads.DeleteTaskPayload
  ): Promise<void> {
    await taskService.deleteTask(payload);
    context.commit('deleteTask', payload.id);
    if (context.state.taskList.rows.length === 0) {
      await context.dispatch('fetchTasks', {
        pageIndex: context.state.taskList.pagination.pageIndex,
        pageSize: context.state.taskList.pagination.pageSize,
      });
    }
  },

  reset(context: ActionContext<TaskStoreState, AppStoreState>): void {
    context.commit('setTasks', new TaskList());
  },
});
