import { TaskList } from '../../models/task.model';

export interface TaskStoreState {
  readonly taskList: TaskList;
}

export const useState = (): TaskStoreState => ({
  taskList: new TaskList(),
});
