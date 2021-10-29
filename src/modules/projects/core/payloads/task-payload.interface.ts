import { TaskType } from '../enums/task-type.enum';

export interface CreateTaskPayload {
  readonly title: string;
  readonly description: string;
  readonly type: TaskType;
  readonly projectId: Guid;
}

export interface UpdateTaskPayload {
  readonly id: Guid;
  readonly title: string;
  readonly description: string;
  readonly type: TaskType;
}

export interface DeleteTaskPayload {
  readonly id: Guid;
}

export interface GetTaskByIdPayload {
  id: Guid;
}

export interface GetTasksByProjectIdPayload {
  pageIndex: number;
  pageSize: number;
  projectId: Guid;
}

export interface SearchTasksInProjectPayload {
  pageIndex: number;
  pageSize: number;
  value: string;
  projectId: Guid;
}
