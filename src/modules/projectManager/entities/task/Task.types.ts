import { TaskType } from '../../enums';

export interface TaskData {
  readonly id?: Guid;
  readonly date?: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;

  readonly type: TaskType;
}

export interface Task {
  readonly id?: Guid;
  readonly date?: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;

  readonly type: TaskType;
}

export interface EditableTask {
  id?: Guid;
  date?: Date;
  title: string;
  description: string;

  type: TaskType;
}

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

export interface GetTaskByIdPayload {
  id: Guid;
}

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  rowsNumber: number;
}
