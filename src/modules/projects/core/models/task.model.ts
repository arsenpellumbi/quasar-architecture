import { PaginatedList } from '~/core/models/pagination.model';
import { TaskType } from '../enums/task-type.enum';

export class Task {
  readonly id?: Guid;
  readonly date: Date | null;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;

  constructor(id?: Guid, date?: Date | null, title?: string, description?: string, projectId?: Guid, type?: TaskType) {
    this.id = id || null;
    this.date = date || null;
    this.title = title || '';
    this.description = description || '';
    this.projectId = projectId || null;
    this.type = type || TaskType.ToDo;
  }

  public clone(): Task {
    return new Task(this.id, this.date, this.title, this.description, this.projectId, this.type);
  }
}

export class TaskList extends PaginatedList<Task> {}
