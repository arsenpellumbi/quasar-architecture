import { Store } from 'vuex';
import {
  CreateTaskPayload,
  DeleteTaskPayload,
  GetTaskByIdPayload,
  GetTasksByProjectIdPayload,
  Task,
  SearchTasksInProjectPayload,
  UpdateTaskPayload
} from '../../entities/task';
import { usePaginatedStorage, PaginatedStorage } from 'src/store/base/paginated-store/storage';
import { computed, ComputedRef } from '@vue/composition-api';
import { AppStoreState } from 'src/store';

export interface TaskStorage extends PaginatedStorage {
  readonly currentTasks: ComputedRef<Task[]>;
  fetchTasks(payload: GetTasksByProjectIdPayload): Promise<void>;
  searchTasks(payload: SearchTasksInProjectPayload): Promise<void>;
  createTask(payload: CreateTaskPayload): Promise<void>;
  updateTask(payload: UpdateTaskPayload): Promise<void>;
  deleteTask(payload: DeleteTaskPayload): Promise<void>;
  getTaskById(payload: GetTaskByIdPayload): Promise<Task>;
  reset(): void;
}

export function useTaskStorage(store: Store<AppStoreState>, namespace: string): TaskStorage {
  const paginatedStorage = usePaginatedStorage(store, namespace);
  return {
    ...paginatedStorage,
    currentTasks: computed(() => (store.getters as { [key: string]: Task[] })[`${namespace}/currentTasks`]),
    fetchTasks: async (payload: GetTasksByProjectIdPayload): Promise<void> =>
      (await store.dispatch(`${namespace}/fetchTasks`, payload)) as Promise<void>,
    searchTasks: async (payload: SearchTasksInProjectPayload): Promise<void> =>
      (await store.dispatch(`${namespace}/searchTasks`, payload)) as Promise<void>,
    createTask: async (payload: CreateTaskPayload): Promise<void> =>
      (await store.dispatch(`${namespace}/createTask`, payload)) as Promise<void>,
    updateTask: async (payload: UpdateTaskPayload): Promise<void> =>
      (await store.dispatch(`${namespace}/updateTask`, payload)) as Promise<void>,
    deleteTask: async (payload: DeleteTaskPayload): Promise<void> =>
      (await store.dispatch(`${namespace}/deleteTask`, payload)) as Promise<void>,
    getTaskById: async (payload: GetTaskByIdPayload): Promise<Task> =>
      (await store.dispatch(`${namespace}/getTaskById`, payload)) as Promise<Task>,
    reset: async (): Promise<void> => (await store.dispatch(`${namespace}/reset`)) as Promise<void>
  };
}
