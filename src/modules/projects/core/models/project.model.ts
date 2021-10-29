import { PaginatedList } from '~/core/models/pagination.model';

export class Project {
  readonly id?: Guid;
  readonly date: Date | null;
  readonly title: string;
  readonly description: string;

  constructor(id?: Guid, date?: Date | null, title?: string, description?: string) {
    this.id = id || null;
    this.date = date || null;
    this.title = title || '';
    this.description = description || '';
  }

  public clone(): Project {
    return new Project(this.id, this.date, this.title, this.description);
  }
}

export class ProjectList extends PaginatedList<Project> {}
