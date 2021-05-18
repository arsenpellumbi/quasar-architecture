import { TaskType } from '../../enums';
import { TaskData } from './task.types';

export class Task {
  readonly id?: Guid;
  readonly date?: Date;
  readonly title: string;
  readonly description: string;
  readonly projectId: Guid;
  readonly type: TaskType;

  constructor(data: TaskData) {
    if (data.id) {
      this.id = data.id;
    }

    if (data.date) {
      this.date = data.date;
    }

    this.title = data.title;
    this.description = data.description;
    this.projectId = data.projectId;
    this.type = data.type;
  }
}
