import { ApiService } from 'src/core/api/api-service';
import { RequestMethod } from 'src/core/enums';
import { PaginatedData } from 'src/core/types';
import { AxiosResponse } from 'axios';
import {
  GetTasksByProjectIdPayload,
  TaskData,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload
} from '../../entities/task';
import { ITaskService } from './task-service.types';

export class TaskService extends ApiService implements ITaskService {
  private static _instance: ITaskService;

  constructor(endpoint: string) {
    super(endpoint);
  }

  public async getTasks(payload: GetTasksByProjectIdPayload): Promise<PaginatedData<TaskData>> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/tasks',
      params: payload,
      loading: true
    }).then((response: AxiosResponse<PaginatedData<TaskData>>) => response.data);
  }

  public async searchTasks(payload: SearchTasksInProjectPayload): Promise<PaginatedData<TaskData>> {
    return await this.request({
      method: RequestMethod.Get,
      url: '/projects/tasks/search',
      params: payload
    }).then((response: AxiosResponse<PaginatedData<TaskData>>) => response.data);
  }

  public async getTask(payload: GetTaskByIdPayload): Promise<TaskData> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Get,
      url: `/projects/tasks/${id}`,
      loading: true
    }).then((response: AxiosResponse<TaskData>) => response.data);
  }

  public async createTask(payload: CreateTaskPayload): Promise<Guid> {
    return await this.request({
      method: RequestMethod.Post,
      url: '/projects/tasks',
      data: payload,
      loading: false
    }).then((response: AxiosResponse<Guid>) => response.data);
  }

  public async updateTask(payload: UpdateTaskPayload): Promise<void> {
    return await this.request({
      method: RequestMethod.Put,
      url: '/projects/tasks',
      data: payload,
      loading: false
    }).then((response: AxiosResponse<void>) => response.data);
  }

  public async deleteTask(payload: DeleteTaskPayload): Promise<void> {
    const id = payload.id ? payload.id.toString() : '';
    return await this.request({
      method: RequestMethod.Delete,
      url: `/projects/tasks/${id}`,
      loading: false
    }).then((response: AxiosResponse<void>) => response.data);
  }

  public static initialize(endpoint: string) {
    this._instance = new this(endpoint);
  }

  public static get Instance(): ITaskService {
    return this._instance;
  }
}

export function useTaskService(endpoint: string): ITaskService {
  if (!TaskService.Instance) {
    TaskService.initialize(endpoint);
  }

  return TaskService.Instance;
}
