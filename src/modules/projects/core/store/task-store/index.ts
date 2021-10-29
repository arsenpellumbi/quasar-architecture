import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';

import { useState } from './state';
import { useActions } from './actions';
import { useGetters } from './getters';
import { useMutations } from './mutations';

import { AppStore, APP_STORE } from '~/store/app.store';
import { TaskList, Task } from '../../models/task.model';
import { TaskPayloads } from '../../payloads';
import { TASK_SERVICE, TaskService } from '../../services/task-service';

export const TASK_STORE: interfaces.ServiceIdentifier<TaskStore> = 'TASK_STORE';

@provide<TaskStore>(TASK_STORE)
export class TaskStore {
  private readonly _namespace: string;
  private readonly _appStore: AppStore;

  constructor(@inject(APP_STORE) store: AppStore, @inject(TASK_SERVICE) taskService: TaskService) {
    this._namespace = 'projects/task-store';
    this._appStore = store;

    if (!this._appStore.store.hasModule(this._namespace)) {
      this._appStore.store.registerModule(this._namespace, {
        namespaced: true,
        actions: useActions(taskService),
        getters: useGetters(),
        mutations: useMutations(),
        state: useState(),
      });
    }
  }

  get taskList(): TaskList {
    return (this._appStore.store.getters as { [key: string]: TaskList })[`${this._namespace}/taskList`];
  }

  async fetchTasks(payload: TaskPayloads.GetTasksByProjectIdPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/fetchTasks`, payload);
  }

  async searchTasks(payload: TaskPayloads.SearchTasksInProjectPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/searchTasks`, payload);
  }

  async createTask(payload: TaskPayloads.CreateTaskPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/createTask`, payload);
  }

  async updateTask(payload: TaskPayloads.UpdateTaskPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/updateTask`, payload);
  }

  async deleteTask(payload: TaskPayloads.DeleteTaskPayload): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/deleteTask`, payload);
  }

  async getTaskById(payload: TaskPayloads.GetTaskByIdPayload): Promise<Task> {
    return (await this._appStore.store.dispatch(`${this._namespace}/getTaskById`, payload)) as Promise<Task>;
  }

  async reset(): Promise<void> {
    await this._appStore.store.dispatch(`${this._namespace}/reset`);
  }
}
