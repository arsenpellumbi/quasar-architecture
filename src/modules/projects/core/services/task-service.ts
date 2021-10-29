import { CONFIGURATIONS, Configurations } from '~/core/configurations/configurations';
import axios, { AxiosResponse } from 'axios';
import { inject, interfaces } from 'inversify';
import { provide } from '~/inversify.config';
import { TaskType } from '../enums/task-type.enum';
import { Task, TaskList } from '../models/task.model';
import { TaskPayloads } from '../payloads';

interface GetTaskByIdPayloadResult {
  readonly id: Guid;
  readonly createdDate: Date;
  readonly modifiedDate: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;
}

interface GetTasksByProjectIdPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
    readonly projectId: Guid;
    readonly type: TaskType;
  }[];
}

interface SearchTasksInProjectPayloadResult {
  readonly totalPages: number;
  readonly count: number;
  readonly data: {
    readonly id: Guid;
    readonly createdDate: Date;
    readonly modifiedDate: Date;
    readonly title: string;
    readonly description: string;
    readonly projectId: Guid;
    readonly type: TaskType;
  }[];
}

export const TASK_SERVICE: interfaces.ServiceIdentifier<TaskService> = 'TASK_SERVICE';

@provide<TaskService>(TASK_SERVICE)
export class TaskService {
  private readonly _baseUrl: string;

  constructor(@inject(CONFIGURATIONS) configurations: Configurations) {
    this._baseUrl = configurations.endpoints.projectManagerApi.baseUrl;
  }

  public async getTasks(payload: TaskPayloads.GetTasksByProjectIdPayload): Promise<TaskList> {
    return await axios.get(`${this._baseUrl}/projects/tasks`, { params: payload }).then(
      (response: AxiosResponse<GetTasksByProjectIdPayloadResult>) =>
        new TaskList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) =>
              new Task(
                item.id,
                item.modifiedDate || item.createdDate,
                item.title,
                item.description,
                item.projectId,
                item.type
              )
          )
        )
    );
  }

  public async searchTasks(payload: TaskPayloads.SearchTasksInProjectPayload): Promise<TaskList> {
    return await axios.get(`${this._baseUrl}/projects/tasks/search`, { params: payload }).then(
      (response: AxiosResponse<SearchTasksInProjectPayloadResult>) =>
        new TaskList(
          payload.pageIndex,
          payload.pageSize,
          response.data.totalPages,
          response.data.count,
          response.data.data.map(
            (item) =>
              new Task(
                item.id,
                item.modifiedDate || item.createdDate,
                item.title,
                item.description,
                item.projectId,
                item.type
              )
          )
        )
    );
  }

  public async getTask(payload: TaskPayloads.GetTaskByIdPayload): Promise<Task> {
    const id = payload.id ? payload.id.toString() : '';
    return await axios
      .get(`${this._baseUrl}/projects/tasks/${id}`)
      .then(
        (response: AxiosResponse<GetTaskByIdPayloadResult>) =>
          new Task(
            response.data.id,
            response.data.modifiedDate || response.data.createdDate,
            response.data.title,
            response.data.description,
            response.data.projectId,
            response.data.type
          )
      );
  }

  public async createTask(payload: TaskPayloads.CreateTaskPayload): Promise<Guid> {
    return await axios
      .post(`${this._baseUrl}/projects/tasks`, payload)
      .then((response: AxiosResponse<Guid>) => response.data);
  }

  public async updateTask(payload: TaskPayloads.UpdateTaskPayload): Promise<void> {
    return await axios
      .put(`${this._baseUrl}/projects/tasks`, payload)
      .then((response: AxiosResponse<void>) => response.data);
  }

  public async deleteTask(payload: TaskPayloads.DeleteTaskPayload): Promise<void> {
    const id = payload.id ? payload.id.toString() : '';
    return await axios
      .delete(`${this._baseUrl}/projects/tasks/${id}`)
      .then((response: AxiosResponse<void>) => response.data);
  }
}
