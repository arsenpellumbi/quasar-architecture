import { ProjectList } from '../../models/project.model';

export interface ProjectStoreState {
  readonly projectList: ProjectList;
}

export const useState = (): ProjectStoreState => ({
  projectList: new ProjectList(),
});
