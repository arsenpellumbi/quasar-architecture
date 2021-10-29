import { MutationTree } from 'vuex';
import { ProjectList, Project } from '../../models/project.model';
import { ProjectStoreState } from './state';

export const useMutations = (): MutationTree<ProjectStoreState> => ({
  setProjects(state: ProjectStoreState, projectList: ProjectList): void {
    state.projectList.updateList(projectList);
  },

  addProject(state: ProjectStoreState, project: Project): void {
    state.projectList.addItem(project);
  },

  updateProject(state: ProjectStoreState, project: Project): void {
    const oldProject = state.projectList.rows.find((_project: Project) => _project.id == project.id);
    if (oldProject) state.projectList.updateItem(oldProject, project);
    else state.projectList.addItem(project);
  },

  deleteProject(state: ProjectStoreState, id: Guid): void {
    const project = state.projectList.rows.find((_project: Project) => _project.id == id);
    if (project) state.projectList.removeItem(project);
  },
});
