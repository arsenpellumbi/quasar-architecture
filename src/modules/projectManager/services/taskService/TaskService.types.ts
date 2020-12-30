import { PaginatedData } from 'src/core/types';
import {
  GetTasksByProjectIdPayload,
  TaskData,
  SearchTasksInProjectPayload,
  GetTaskByIdPayload,
  CreateTaskPayload,
  UpdateTaskPayload,
  DeleteTaskPayload
} from '../../entities/task';

export interface TaskService {
  getTasks(payload: GetTasksByProjectIdPayload): Promise<PaginatedData<TaskData>>;
  searchTasks(payload: SearchTasksInProjectPayload): Promise<PaginatedData<TaskData>>;
  getTask(payload: GetTaskByIdPayload): Promise<TaskData>;
  createTask(payload: CreateTaskPayload): Promise<Guid>;
  updateTask(payload: UpdateTaskPayload): Promise<void>;
  deleteTask(payload: DeleteTaskPayload): Promise<void>;
}
