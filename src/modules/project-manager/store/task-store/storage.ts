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
import { IPaginatedStorage, PaginatedStorage } from 'src/store/base/paginated-store/storage';
import { AppStoreState } from 'src/store';

export interface ITaskStorage extends IPaginatedStorage {
  readonly currentTasks: Task[];
  fetchTasks(payload: GetTasksByProjectIdPayload): Promise<void>;
  searchTasks(payload: SearchTasksInProjectPayload): Promise<void>;
  createTask(payload: CreateTaskPayload): Promise<void>;
  updateTask(payload: UpdateTaskPayload): Promise<void>;
  deleteTask(payload: DeleteTaskPayload): Promise<void>;
  getTaskById(payload: GetTaskByIdPayload): Promise<Task>;
  reset(): Promise<void>;
}

class TaskStorage extends PaginatedStorage<AppStoreState> implements ITaskStorage {
  private static _instance: ITaskStorage;

  get currentTasks(): Task[] {
    return (this._store.getters as { [key: string]: Task[] })[`${this._namespace}/currentTasks`];
  }

  constructor(store: Store<AppStoreState>, namespace: string) {
    super(store, namespace);
  }

  async fetchTasks(payload: GetTasksByProjectIdPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/fetchTasks`, payload);
  }

  async searchTasks(payload: SearchTasksInProjectPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/searchTasks`, payload);
  }

  async createTask(payload: CreateTaskPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/createTask`, payload);
  }

  async updateTask(payload: UpdateTaskPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/updateTask`, payload);
  }

  async deleteTask(payload: DeleteTaskPayload): Promise<void> {
    await this._store.dispatch(`${this._namespace}/deleteTask`, payload);
  }

  async getTaskById(payload: GetTaskByIdPayload): Promise<Task> {
    return (await this._store.dispatch(`${this._namespace}/getTaskById`, payload)) as Promise<Task>;
  }

  async reset(): Promise<void> {
    await this._store.dispatch(`${this._namespace}/reset`);
  }
  
  public static initialize(store: Store<AppStoreState>, namespace: string) {
    this._instance = new this(store, namespace);
  }

  public static get Instance(): ITaskStorage {
    return this._instance;
  }
}

export function useTaskStorage(store: Store<AppStoreState>, namespace: string): ITaskStorage {
  if (!TaskStorage.Instance) {
    TaskStorage.initialize(store, namespace);
  }

  return TaskStorage.Instance;
}
