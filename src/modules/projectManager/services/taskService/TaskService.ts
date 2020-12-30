import { ApiService } from 'src/core/api/ApiService';
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
import { TaskService } from './TaskService.types';

export class TaskServiceInstance extends ApiService implements TaskService {
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
}
