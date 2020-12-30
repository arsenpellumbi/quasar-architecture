import { Project, ProjectData } from './Project.types';

export class ProjectInstance implements Project {
  readonly id?: Guid;
  readonly date?: Date;
  readonly title: string;
  readonly description: string;

  constructor(data: ProjectData) {
    if (data.id) {
      this.id = data.id;
    }

    if (data.date) {
      this.date = data.date;
    }

    this.title = data.title;
    this.description = data.description;
  }
}
